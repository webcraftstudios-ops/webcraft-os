import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MatchSetup } from './MatchSetup';

describe('MatchSetup component', () => {
  it('toont standaardwaarden voor spelers en game type 501', () => {
    const handleStartMatch = vi.fn();
    render(<MatchSetup onStartMatch={handleStartMatch} />);

    // Check of de input velden bestaan en de default values hebben
    expect(screen.getByRole('textbox', { name: /Player 1/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Player 2/i })).toBeInTheDocument();

    // 501 knop zou 'primary' variant class moeten hebben (die in onze UI een bepaalde styling heeft)
    // Omdat we geen toegang hebben tot de werkelijke CSS styles in jsdom testen we hier de actieve staat
    // indirect door te testen dat submit default values doorgeeft:
    
    fireEvent.click(screen.getByRole('button', { name: /Let's Play Darts/i }));
    
    expect(handleStartMatch).toHaveBeenCalledWith({
      player1: 'Player 1',
      player2: 'Player 2',
      gameType: 501,
    });
  });

  it('geeft aangepaste spelersnamen en game type (301) correct door', () => {
    const handleStartMatch = vi.fn();
    render(<MatchSetup onStartMatch={handleStartMatch} />);

    // Pas velden aan
    const p1Input = screen.getByRole('textbox', { name: /Player 1/i });
    const p2Input = screen.getByRole('textbox', { name: /Player 2/i });
    
    fireEvent.change(p1Input, { target: { value: 'Michael van Gerwen' } });
    fireEvent.change(p2Input, { target: { value: 'Luke Littler' } });

    // Selecteer 301
    const btn301 = screen.getByRole('button', { name: '301' });
    fireEvent.click(btn301);

    // Submit het formulier
    fireEvent.click(screen.getByRole('button', { name: /Let's Play Darts/i }));

    expect(handleStartMatch).toHaveBeenCalledWith({
      player1: 'Michael van Gerwen',
      player2: 'Luke Littler',
      gameType: 301,
    });
  });

  it('voorkomt lege namen en valt terug op de defaults via trim', () => {
    const handleStartMatch = vi.fn();
    render(<MatchSetup onStartMatch={handleStartMatch} />);

    // Maak velden leeg door alleen spaties in te voeren
    const p1Input = screen.getByRole('textbox', { name: /Player 1/i });
    fireEvent.change(p1Input, { target: { value: '    ' } });

    // Bij HTML-5 "required" zal de form-submit eventueel al falen in de browser, 
    // maar onze React `trim() || 'Player 1'` logica vangt whitespace ook af.
    fireEvent.submit(screen.getByRole('button', { name: /Let's Play Darts/i }));

    expect(handleStartMatch).toHaveBeenCalledWith({
      player1: 'Player 1', // Is door trim() fallback teruggezet
      player2: 'Player 2',
      gameType: 501,
    });
  });

  it('verwerkt extreem lange namen, speciale tekens en emojis correct', () => {
    const handleStartMatch = vi.fn();
    render(<MatchSetup onStartMatch={handleStartMatch} />);

    const p1Input = screen.getByRole('textbox', { name: /Player 1/i });
    const p2Input = screen.getByRole('textbox', { name: /Player 2/i });

    // Extreem lange naam en vreemde karakters
    const longName = 'A'.repeat(100);
    const emojiName = '🎯 Player 🤖 O\'Connor-Smith';

    fireEvent.change(p1Input, { target: { value: longName } });
    fireEvent.change(p2Input, { target: { value: emojiName } });
    
    fireEvent.submit(screen.getByRole('button', { name: /Let's Play Darts/i }));

    expect(handleStartMatch).toHaveBeenCalledWith({
      player1: longName,
      player2: emojiName,
      gameType: 501,
    });
  });

  it('wisselt correct heen en weer tussen game types zonder de speler data te verliezen', () => {
    const handleStartMatch = vi.fn();
    render(<MatchSetup onStartMatch={handleStartMatch} />);

    const p1Input = screen.getByRole('textbox', { name: /Player 1/i });
    fireEvent.change(p1Input, { target: { value: 'Phil Taylor' } });

    const btn301 = screen.getByRole('button', { name: '301' });
    const btn501 = screen.getByRole('button', { name: '501' });

    // Toggle heen en weer
    fireEvent.click(btn301);
    fireEvent.click(btn501);
    fireEvent.click(btn301);

    fireEvent.submit(screen.getByRole('button', { name: /Let's Play Darts/i }));

    // Verwacht 301 en behoud van Phil Taylor
    expect(handleStartMatch).toHaveBeenCalledWith({
      player1: 'Phil Taylor',
      player2: 'Player 2',
      gameType: 301,
    });
  });

  it('verstuurt het formulier correct via de "Enter" toets', () => {
    const handleStartMatch = vi.fn();
    render(<MatchSetup onStartMatch={handleStartMatch} />);

    const p1Input = screen.getByRole('textbox', { name: /Player 1/i });
    
    // Verander de naam en druk dan op Enter (wat onKeyDown simuleert of submit triggert in forms)
    fireEvent.change(p1Input, { target: { value: 'Gary Anderson' } });
    
    // In @testing-library/react kun je een Enter simuleren door een submit event te vuren op de form
    // Let op: normaal zou keyDown 'Enter' op de input ook een submit triggeren in de browser
    const form = p1Input.closest('form');
    expect(form).not.toBeNull();
    fireEvent.submit(form!);

    expect(handleStartMatch).toHaveBeenCalledWith({
      player1: 'Gary Anderson',
      player2: 'Player 2',
      gameType: 501,
    });
  });
});