import {render, screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it} from 'vitest';
import App from '../App';

describe('RedE TEA — Protótipo Navegável', () => {
  it('exibe permanentemente o aviso de dados fictícios e o painel inicial acolhedor', () => {
    render(<App />);

    expect(
      screen.getByText('Protótipo demonstrativo com dados fictícios. Não insira dados reais.'),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {name: 'Como podemos apoiar você hoje?'}),
    ).toBeInTheDocument();

    expect(screen.getAllByText(/Quem cuida de quem cuida\?/i).length).toBeGreaterThan(0);
  });

  it('permite navegar entre os quatro perfis demonstrativos e manter o aviso permanente', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', {name: 'Profissional'}));
    expect(
      screen.getByRole('heading', {name: /Dra\. Camila Mendes/i}),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', {name: 'Escola'}));
    expect(
      screen.getByRole('heading', {name: /Prof\.ª Helena Souza/i}),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', {name: 'Curadoria'}));
    expect(
      screen.getByRole('heading', {name: /Revisão de cadastros, conteúdos e ofertas/i}),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', {name: 'Família'}));
    expect(
      screen.getByRole('heading', {name: 'Como podemos apoiar você hoje?'}),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Protótipo demonstrativo com dados fictícios. Não insira dados reais.'),
    ).toBeInTheDocument();
  });

  it('valida mensagens de erro e salva o cadastro fictício em memória', async () => {
    const user = userEvent.setup();
    render(<App />);

    const sidebar = screen.getByRole('navigation', {name: 'Menu principal lateral'});
    await user.click(within(sidebar).getByRole('button', {name: 'Cadastro e criança'}));

    const ageInput = screen.getByLabelText('Idade fictícia');
    await user.clear(ageInput);
    await user.type(ageInput, '99');
    await user.click(screen.getByRole('button', {name: 'Salvar cadastro fictício'}));

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Informe uma idade fictícia entre 1 e 18 anos.',
    );

    await user.clear(ageInput);
    await user.type(ageInput, '8');
    const childInput = screen.getByLabelText('Apelido ou nome fictício da criança');
    await user.clear(childInput);
    await user.type(childInput, 'Mateus (Fictício)');
    await user.click(screen.getByRole('button', {name: 'Salvar cadastro fictício'}));

    expect(screen.getByRole('status')).toHaveTextContent(
      'Cadastro fictício atualizado apenas em memória nesta sessão.',
    );
  });

  it('opera rotina visual, agenda de compromissos e diário fictício com validação', async () => {
    const user = userEvent.setup();
    render(<App />);

    const sidebar = screen.getByRole('navigation', {name: 'Menu principal lateral'});
    await user.click(within(sidebar).getByRole('button', {name: 'Rotina, agenda e diário'}));

    // Adiciona passo na rotina visual
    await user.type(screen.getByLabelText('Nome da atividade'), 'Desenhar no caderno');
    await user.click(screen.getByRole('button', {name: 'Adicionar à rotina'}));
    expect(screen.getByText('Desenhar no caderno')).toBeInTheDocument();

    // Alterna para Agenda e testa validação + criação
    await user.click(screen.getByRole('tab', {name: 'Agenda de compromissos'}));
    await user.click(screen.getByRole('button', {name: 'Salvar compromisso na agenda'}));
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Preencha o nome do compromisso e o local fictício.',
    );

    await user.type(screen.getByLabelText('Título do compromisso'), 'Encontro de pais na escola');
    await user.type(screen.getByLabelText('Local fictício'), 'Escola Fictícia');
    await user.click(screen.getByRole('button', {name: 'Salvar compromisso na agenda'}));
    expect(screen.getByText('Encontro de pais na escola')).toBeInTheDocument();

    // Alterna para Diário e adiciona registro
    await user.click(screen.getByRole('tab', {name: 'Diário fictício'}));
    await user.type(screen.getByLabelText('Resumo curto do momento'), 'Passeio tranquilo');
    await user.type(
      screen.getByLabelText('Observação descritiva fictícia'),
      'Caminhada no parque sem sobrecarga sonora.',
    );
    await user.click(screen.getByRole('button', {name: 'Adicionar registro ao diário'}));
    expect(screen.getByText('Passeio tranquilo')).toBeInTheDocument();
  });

  it('filtra recursos por categoria e município, exibe estado vazio e envia solicitação demonstrativa', async () => {
    const user = userEvent.setup();
    render(<App />);

    const sidebar = screen.getByRole('navigation', {name: 'Menu principal lateral'});
    await user.click(within(sidebar).getByRole('button', {name: 'Recursos e academia'}));

    await user.selectOptions(screen.getByLabelText('Categoria'), 'Academia Inclusiva');
    await user.selectOptions(screen.getByLabelText('Município'), 'Chapecó');

    expect(
      screen.getByText('Academia Movimento Acolhedor — Espaço Pais & Filhos'),
    ).toBeInTheDocument();

    // Estado vazio ao buscar termo inexistente
    await user.type(screen.getByLabelText('Buscar por nome ou palavra-chave'), 'inexistente-xyz');
    expect(
      screen.getByRole('heading', {name: 'Nenhum recurso encontrado com esses filtros'}),
    ).toBeInTheDocument();

    // Recupera estado com botão limpar filtros
    await user.click(screen.getByRole('button', {name: 'Limpar filtros de busca'}));
    expect(
      screen.getByText('Academia Movimento Acolhedor — Espaço Pais & Filhos'),
    ).toBeInTheDocument();

    // Abre solicitação demonstrativa de contato e testa envio
    const contactButtons = screen.getAllByRole('button', {
      name: 'Solicitar contato demonstrativo',
    });
    await user.click(contactButtons[0]);

    const dialog = screen.getByRole('dialog');
    await user.type(
      within(dialog).getByLabelText(/Mensagem demonstrativa/i),
      'Gostaria de visitar a academia inclusiva com meu filho no período da tarde.',
    );
    await user.click(within(dialog).getByRole('button', {name: 'Enviar solicitação demonstrativa'}));

    expect(within(dialog).getByRole('status')).toHaveTextContent(
      'Solicitação registrada em memória',
    );

    // Fecha modal via teclado (Escape)
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('autoriza e revoga acesso por bloco na tela Minha Rede com reflexo imediato no perfil Escola', async () => {
    const user = userEvent.setup();
    render(<App />);

    const sidebar = screen.getByRole('navigation', {name: 'Menu principal lateral'});
    await user.click(within(sidebar).getByRole('button', {name: 'Minha Rede'}));

    // Revoga "Apresentação da criança" da Escola e autoriza "Agenda de compromissos" para a Escola
    await user.click(
      screen.getByRole('button', {
        name: 'Revogar Apresentação da criança para Prof.ª Helena Souza (Fictícia)',
      }),
    );
    await user.click(
      screen.getByRole('button', {
        name: 'Autorizar Agenda de compromissos para Prof.ª Helena Souza (Fictícia)',
      }),
    );

    // Troca para perfil Escola e verifica o reflexo imediato
    await user.click(screen.getByRole('button', {name: 'Escola'}));

    const presentationHeading = screen.getByRole('heading', {name: 'Apresentação da criança'});
    const presentationCard = presentationHeading.closest('article')!;
    expect(
      within(presentationCard).getByText(
        'Acesso não autorizado ou revogado pela família para este bloco.',
      ),
    ).toBeInTheDocument();

    const agendaHeading = screen.getByRole('heading', {name: 'Agenda de compromissos'});
    const agendaCard = agendaHeading.closest('article')!;
    expect(within(agendaCard).getByText('Autorizado')).toBeInTheDocument();
  });

  it('exibe seções em estudo com sinalização de revisão interdisciplinar e suporta navegação por teclado', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Verifica skip link acessível no DOM
    const skipLink = screen.getByRole('link', {name: 'Pular para o conteúdo principal'});
    expect(skipLink).toHaveAttribute('href', '#main-content');

    const sidebar = screen.getByRole('navigation', {name: 'Menu principal lateral'});
    await user.click(within(sidebar).getByRole('button', {name: 'Em estudo'}));

    expect(
      screen.getByRole('heading', {name: 'Funcionalidades em estudo'}),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/Em revisão interdisciplinar/i).length,
    ).toBeGreaterThanOrEqual(5);
  });
});
