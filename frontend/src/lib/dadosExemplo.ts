import { Artigo, Categoria, CategoriaComSecoes, Secao } from './api'

// Conteúdo de demonstração exibido quando a API não responde ou está vazia
// (ex.: apresentações sem backend disponível). Baseado no Guia do Aluno
// oficial da Faculdade de Tecnologia e Inovação SENAC-DF.

export const categoriasExemplo: Categoria[] = [
  {
    id: 9001,
    nome: 'Vida Acadêmica',
    slug: 'vida-academica',
    descricao: 'Moodle, Portal do Aluno, calendário e processos da secretaria.',
    posicao: 1,
  },
  {
    id: 9002,
    nome: 'Avaliações e Frequência',
    slug: 'avaliacoes-e-frequencia',
    descricao: 'Médias, faltas, recuperação, dependência e atividades obrigatórias.',
    posicao: 2,
  },
  {
    id: 9003,
    nome: 'Biblioteca e Apoio ao Aluno',
    slug: 'biblioteca-e-apoio-ao-aluno',
    descricao: 'Empréstimos, salas de estudo, NADIS e apoio psicopedagógico.',
    posicao: 3,
  },
  {
    id: 9004,
    nome: 'Financeiro, Comunicação e Ouvidoria',
    slug: 'financeiro-comunicacao-ouvidoria',
    descricao: 'Boletos, declarações financeiras, CPA, ouvidoria e canais oficiais.',
    posicao: 4,
  },
  {
    id: 9005,
    nome: 'Assuntos Gerais',
    slug: 'assuntos-gerais',
    descricao: 'Notebooks, achados e perdidos, carteirinha, horários e contatos úteis.',
    posicao: 5,
  },
]

const secoesPorCategoria: Record<string, Secao[]> = {
  'vida-academica': [
    { id: 9101, categoria_id: 9001, nome: 'Primeiros Acessos', slug: 'primeiros-acessos', posicao: 1 },
    { id: 9102, categoria_id: 9001, nome: 'Secretaria e Calendário', slug: 'secretaria-e-calendario', posicao: 2 },
  ],
  'avaliacoes-e-frequencia': [
    { id: 9201, categoria_id: 9002, nome: 'Notas e Aprovação', slug: 'notas-e-aprovacao', posicao: 1 },
    { id: 9202, categoria_id: 9002, nome: 'Frequência e Atividades Obrigatórias', slug: 'frequencia-e-atividades-obrigatorias', posicao: 2 },
  ],
  'biblioteca-e-apoio-ao-aluno': [
    { id: 9301, categoria_id: 9003, nome: 'Biblioteca', slug: 'biblioteca', posicao: 1 },
    { id: 9302, categoria_id: 9003, nome: 'NADIS — Núcleo de Apoio ao Discente', slug: 'nadis-nucleo-de-apoio-ao-discente', posicao: 2 },
  ],
  'financeiro-comunicacao-ouvidoria': [
    { id: 9401, categoria_id: 9004, nome: 'Financeiro', slug: 'financeiro', posicao: 1 },
    { id: 9402, categoria_id: 9004, nome: 'Comunicação, CPA e Ouvidoria', slug: 'comunicacao-cpa-e-ouvidoria', posicao: 2 },
  ],
  'assuntos-gerais': [
    { id: 9501, categoria_id: 9005, nome: 'Serviços do Dia a Dia', slug: 'servicos-do-dia-a-dia', posicao: 1 },
    { id: 9502, categoria_id: 9005, nome: 'Horários e Contatos', slug: 'horarios-e-contatos', posicao: 2 },
  ],
}

export const artigosExemplo: Artigo[] = [
  {
    id: 9601,
    titulo: 'Como acessar o Moodle pela primeira vez',
    slug: 'como-acessar-moodle-primeira-vez',
    conteudo:
      'O Moodle é o Ambiente Virtual de Aprendizagem (AVA) da FacSenac-DF — é nele que você encontra materiais das disciplinas, comunicados e a interação com professores e setores.\n\n' +
      'Seu acesso é criado automaticamente após a matrícula, e as informações chegam por e-mail. Para o primeiro acesso:\n\n' +
      '1. Acesse http://moodle.df.senac.br/faculdade (graduação e pós-graduação).\n' +
      '2. Use o número do seu CPF como nome de usuário (com pontos e traço, ex.: xxx.xxx.xxx-xx).\n' +
      '3. A senha padrão é 123456 — você precisará trocá-la no primeiro login.\n\n' +
      'Pronto! Você já pode visualizar as disciplinas em que está matriculado.\n\n' +
      'Problemas no primeiro acesso? Envie um e-mail para faculdade.moodle@df.senac.br.',
    status: 'publicado',
    secao_id: 9101,
    publicado_em: '2026-01-20T12:00:00Z',
    criado_em: '2026-01-15T12:00:00Z',
    atualizado_em: '2026-01-20T12:00:00Z',
  },
  {
    id: 9602,
    titulo: 'Portal do Aluno: notas, frequência e boletos',
    slug: 'portal-do-aluno-notas-frequencia-boletos',
    conteudo:
      'O Portal do Aluno (aluno.df.senac.br) é onde você acompanha sua vida acadêmica: consulta notas e frequência, vê as disciplinas cursadas e a cursar, e emite a segunda via dos boletos de mensalidade — sempre dentro do prazo de vencimento.\n\n' +
      'Para o primeiro acesso, clique em "não sou cadastrado/esqueci minha senha" e informe seu CPF. As instruções para criar a senha chegam no e-mail cadastrado.\n\n' +
      'Se não conseguir acessar, escreva para secretariaacademica@df.senac.br.',
    status: 'publicado',
    secao_id: 9101,
    publicado_em: '2026-01-22T12:00:00Z',
    criado_em: '2026-01-15T12:00:00Z',
    atualizado_em: '2026-01-22T12:00:00Z',
  },
  {
    id: 9603,
    titulo: 'Calendário acadêmico: fique de olho nas datas',
    slug: 'calendario-academico-fique-de-olho-nas-datas',
    conteudo:
      'O calendário acadêmico é o documento que define os prazos e eventos de cada semestre letivo — provas, recessos, períodos de matrícula, recuperação e muito mais.\n\n' +
      'É responsabilidade de cada estudante acompanhar essas datas regularmente. Você encontra o calendário atualizado nos murais físicos da FacSenac e também na página inicial do Moodle.',
    status: 'publicado',
    secao_id: 9102,
    publicado_em: '2026-01-25T12:00:00Z',
    criado_em: '2026-01-15T12:00:00Z',
    atualizado_em: '2026-01-25T12:00:00Z',
  },
  {
    id: 9604,
    titulo: 'Processos acadêmicos: matrícula, declarações e histórico',
    slug: 'processos-academicos-matricula-declaracoes-historico',
    conteudo:
      'A Secretaria Acadêmica cuida de todos os processos relacionados à sua vida estudantil, entre eles:\n\n' +
      '• Matrícula e renovação de matrícula\n' +
      '• Trancamento e cancelamento de matrícula\n' +
      '• Solicitação de dependência e aproveitamento de disciplinas\n' +
      '• Revisão de nota e frequência\n' +
      '• Ajuste de grade e histórico escolar\n' +
      '• Declarações (escolaridade, passe estudantil, conclusão de curso, entre outras)\n\n' +
      'Solicitações e dúvidas podem ser enviadas para secretariaacademica@df.senac.br ou tratadas presencialmente na central de atendimento, no térreo da Faculdade.',
    status: 'publicado',
    secao_id: 9102,
    publicado_em: '2026-01-28T12:00:00Z',
    criado_em: '2026-01-15T12:00:00Z',
    atualizado_em: '2026-01-28T12:00:00Z',
  },
  {
    id: 9605,
    titulo: 'Atestados médicos e Regime Especial de Aprendizagem',
    slug: 'atestados-medicos-regime-especial-de-aprendizagem',
    conteudo:
      'Atestados médicos com 8 dias ou mais devem ser enviados em até 48 horas para secretariaacademica@df.senac.br. Nesse caso, você entra no Regime Especial de Aprendizagem (REA): uma sala virtual exclusiva no Moodle, com os conteúdos das disciplinas e onde você entrega as atividades solicitadas.\n\n' +
      'Provas, apresentações e demais atividades presenciais continuam sendo realizadas presencialmente, conforme orientação dos professores.\n\n' +
      'Atestados com prazo menor que 8 dias devem ser tratados diretamente com o professor ou a coordenação do curso.',
    status: 'publicado',
    secao_id: 9102,
    publicado_em: '2026-02-02T12:00:00Z',
    criado_em: '2026-01-15T12:00:00Z',
    atualizado_em: '2026-02-02T12:00:00Z',
  },
  {
    id: 9606,
    titulo: 'Como funciona a média para aprovação',
    slug: 'como-funciona-a-media-para-aprovacao',
    conteudo:
      'Para ser aprovado sem prova final, a média do semestre em cada disciplina precisa ser igual ou superior a 6,0.\n\n' +
      '• Média entre 2,0 e 5,9 → você faz prova final, com todo o conteúdo da disciplina\n' +
      '• Média abaixo de 2,0 → reprovação automática\n' +
      '• Depois da prova final, a média para aprovação também precisa ser igual ou superior a 6,0\n\n' +
      'Composição das notas:\n' +
      '1º bimestre — 10 pontos de provas e/ou atividades avaliativas\n' +
      '2º bimestre — 10 pontos, sendo 2 da Avaliação Integrada, 1 da Jornada Interdisciplinar e 7 de provas e/ou atividades avaliativas\n\n' +
      'Use a aba "Médias" do app para simular esse cálculo com suas próprias notas.',
    status: 'publicado',
    secao_id: 9201,
    publicado_em: '2026-02-05T12:00:00Z',
    criado_em: '2026-01-20T12:00:00Z',
    atualizado_em: '2026-02-05T12:00:00Z',
  },
  {
    id: 9607,
    titulo: 'Faltou à prova? Veja o que fazer',
    slug: 'faltou-a-prova-veja-o-que-fazer',
    conteudo:
      'Se você não puder comparecer no dia de uma prova, mas tiver uma justificativa, o professor pode aplicar uma nova avaliação para você.\n\n' +
      'Caso isso não seja possível, você terá a chance de recuperar essa nota na prova final, que cobre todo o conteúdo da disciplina.',
    status: 'publicado',
    secao_id: 9201,
    publicado_em: '2026-02-06T12:00:00Z',
    criado_em: '2026-01-20T12:00:00Z',
    atualizado_em: '2026-02-06T12:00:00Z',
  },
  {
    id: 9608,
    titulo: 'Dependência: como solicitar e cumprir',
    slug: 'dependencia-como-solicitar-e-cumprir',
    conteudo:
      'A dependência é concedida a quem foi reprovado em uma disciplina — seja por nota, seja por frequência. Ela é cumprida com a orientação de um professor, por meio de estudos e atividades dirigidas, encerrando com uma prova final.\n\n' +
      'A solicitação deve ser feita dentro do período definido no calendário acadêmico, pelo e-mail secretariaacademica@df.senac.br, e depende da análise da Coordenação e do pagamento da taxa correspondente.',
    status: 'publicado',
    secao_id: 9201,
    publicado_em: '2026-02-07T12:00:00Z',
    criado_em: '2026-01-20T12:00:00Z',
    atualizado_em: '2026-02-07T12:00:00Z',
  },
  {
    id: 9609,
    titulo: 'Frequência às aulas: faltas e presenças',
    slug: 'frequencia-as-aulas-faltas-e-presencas',
    conteudo:
      'Você precisa comparecer a, no mínimo, 75% das aulas de cada disciplina ao longo do semestre — ou seja, pode faltar em até 25% da carga horária total.\n\n' +
      'Importante: cada dia de aula equivale a 4 presenças. Por exemplo, em uma disciplina de 70h, o limite é de 20 faltas (o equivalente a 5 dias).\n\n' +
      'Use a aba "Presença" do app para acompanhar suas faltas em cada disciplina e saber até quando você pode faltar com segurança.',
    status: 'publicado',
    secao_id: 9202,
    publicado_em: '2026-02-09T12:00:00Z',
    criado_em: '2026-01-20T12:00:00Z',
    atualizado_em: '2026-02-09T12:00:00Z',
  },
  {
    id: 9610,
    titulo: 'Avaliação Integrada e Jornada Interdisciplinar',
    slug: 'avaliacao-integrada-e-jornada-interdisciplinar',
    conteudo:
      'Avaliação Integrada: prova semestral, on-line pelo Moodle e obrigatória para todos os alunos da graduação, reunindo o conteúdo de todas as disciplinas cursadas no semestre. Vale 2 pontos da nota do 2º bimestre e não tem segunda chamada — fique de olho no calendário acadêmico para não perder a data.\n\n' +
      'Jornada Interdisciplinar: conjunto de oficinas, palestras, exposições e feiras, realizado no mesmo turno da sua matrícula, em datas marcadas no calendário acadêmico. A presença vale 1 ponto na nota do 2º bimestre e ajuda a desenvolver uma visão mais ampla sobre o que você está estudando.',
    status: 'publicado',
    secao_id: 9202,
    publicado_em: '2026-02-10T12:00:00Z',
    criado_em: '2026-01-20T12:00:00Z',
    atualizado_em: '2026-02-10T12:00:00Z',
  },
  {
    id: 9611,
    titulo: 'Extensão e certificação intermediária',
    slug: 'extensao-e-certificacao-intermediaria',
    conteudo:
      'Extensão: disciplinas obrigatórias, exigidas pelo MEC, que ampliam sua formação por meio de experiências dentro e fora da faculdade. Ficam disponíveis no Moodle e precisam ser concluídas ao longo do curso.\n\n' +
      'Certificação intermediária: ao concluir certos blocos de disciplinas, você já pode receber um certificado que comprova qualificação para o mercado de trabalho — antes mesmo de terminar a graduação. Por exemplo, no curso de Gestão da Tecnologia da Informação, quem conclui o 1º e o 2º semestres recebe a certificação de Assistente em TI.\n\n' +
      'Os certificados podem ser solicitados pelo e-mail secretariaacademica@df.senac.br após a conclusão dos módulos.',
    status: 'publicado',
    secao_id: 9202,
    publicado_em: '2026-02-11T12:00:00Z',
    criado_em: '2026-01-20T12:00:00Z',
    atualizado_em: '2026-02-11T12:00:00Z',
  },
  {
    id: 9612,
    titulo: 'Rede de Bibliotecas SENAC-DF: serviços e condições de empréstimo',
    slug: 'rede-de-bibliotecas-senac-df-servicos-e-emprestimos',
    conteudo:
      'A Rede de Bibliotecas SENAC/DF reúne sete unidades — incluindo a Biblioteca Central na FacSenac 913 Sul — com cerca de 25 mil itens disponíveis. Ao se cadastrar em uma unidade, você pode usar o acervo e o espaço físico de todas elas.\n\n' +
      'Serviços oferecidos: computadores com internet, consulta ao acervo físico e digital, empréstimo domiciliar, salas de estudo (com agendamento), levantamento bibliográfico, renovação on-line, guarda-volumes e auto devolução.\n\n' +
      'Condições de empréstimo:\n' +
      '• Graduação: até 8 livros por até 10 dias\n' +
      '• Pós-graduação: até 10 livros por até 20 dias\n' +
      '• Multa por atraso: R$ 1,00 por dia, por item\n\n' +
      'Para se cadastrar, leve um documento com foto (ou declaração de matrícula da Secretaria) até a Biblioteca Central.',
    status: 'publicado',
    secao_id: 9301,
    publicado_em: '2026-02-03T12:00:00Z',
    criado_em: '2026-01-25T12:00:00Z',
    atualizado_em: '2026-02-03T12:00:00Z',
  },
  {
    id: 9613,
    titulo: 'NADIS: orientação de carreira e apoio psicopedagógico',
    slug: 'nadis-orientacao-de-carreira-e-apoio-psicopedagogico',
    conteudo:
      'O Núcleo de Apoio ao Discente (NADIS) é o setor que acolhe e escuta as demandas de alunos e egressos — e os serviços são gratuitos. Entre eles:\n\n' +
      '• Aconselhamento profissional e orientação de carreira\n' +
      '• Divulgação de vagas de estágio e emprego\n' +
      '• Apoio na confecção de currículo e formatação de LinkedIn\n' +
      '• Apoio psicopedagógico e no processo de adaptação ao ensino superior\n' +
      '• Apoio a alunos com deficiência (acessibilidade e inclusão)\n' +
      '• Validação de documentação e acompanhamento de estágio\n\n' +
      'Os atendimentos são feitos mediante agendamento na Central de Atendimento, de segunda a sexta, das 9h às 21h.',
    status: 'publicado',
    secao_id: 9302,
    publicado_em: '2026-02-04T12:00:00Z',
    criado_em: '2026-01-25T12:00:00Z',
    atualizado_em: '2026-02-04T12:00:00Z',
  },
  {
    id: 9614,
    titulo: 'Boletos, vencimentos e negociação de débitos',
    slug: 'boletos-vencimentos-e-negociacao-de-debitos',
    conteudo:
      'Os boletos de mensalidade ficam disponíveis no Portal do Aluno. O pagamento deve ser feito até a data de vencimento, pelo banco ou agência credenciada.\n\n' +
      'Depois do vencimento, você ainda pode usar o boleto original por até 90 dias, com multas e juros calculados pelo sistema bancário no momento do pagamento. Passado esse prazo, os débitos vão para órgãos de proteção ao crédito, e a negociação passa a ser feita com a Assessoria Jurídica do SENAC-DF.\n\n' +
      'Dúvidas e solicitações (extratos para imposto de renda, declarações financeiras, cálculos de cancelamento/trancamento) podem ser enviadas para financeiro@df.senac.br.',
    status: 'publicado',
    secao_id: 9401,
    publicado_em: '2026-02-12T12:00:00Z',
    criado_em: '2026-01-28T12:00:00Z',
    atualizado_em: '2026-02-12T12:00:00Z',
  },
  {
    id: 9615,
    titulo: 'CPA e Ouvidoria: como avaliar e dar sua opinião',
    slug: 'cpa-e-ouvidoria-como-avaliar-e-dar-sua-opiniao',
    conteudo:
      'A Comissão Própria de Avaliação (CPA) é responsável por avaliar a Faculdade — ensino, infraestrutura, atuação dos professores e qualidade dos cursos — com representantes de alunos, professores, funcionários e sociedade civil. A cada semestre, todos os estudantes recebem uma pesquisa de opinião e satisfação; os relatórios anteriores ficam na sala da CPA, no Moodle.\n\n' +
      'Já a Ouvidoria é o canal para enviar solicitações, sugestões, reclamações, críticas, elogios e denúncias, com o objetivo de melhorar os processos da FacSenac. Você pode escrever para ouvidoria@df.senac.br ou usar as caixas de acrílico disponíveis na recepção.',
    status: 'publicado',
    secao_id: 9402,
    publicado_em: '2026-02-13T12:00:00Z',
    criado_em: '2026-01-28T12:00:00Z',
    atualizado_em: '2026-02-13T12:00:00Z',
  },
  {
    id: 9616,
    titulo: 'Comunicação: NUREC e canais oficiais da FacSenac',
    slug: 'comunicacao-nurec-e-canais-oficiais-da-facsenac',
    conteudo:
      'O Núcleo de Relacionamento com o Cliente (NUREC) cuida da comunicação interna e externa da FacSenac — divulgação de eventos, captação de alunos e parcerias, e padronização da marca SENAC-DF.\n\n' +
      'Tem uma ideia para divulgar, dúvida sobre um evento (formatura, palestra, feira) ou quer sugerir algo para a comunidade acadêmica? Fale com o NUREC presencialmente no andar administrativo, pelo e-mail relacoesintitucionais@df.senac.br ou pelo telefone (61) 3771-9812.',
    status: 'publicado',
    secao_id: 9402,
    publicado_em: '2026-02-14T12:00:00Z',
    criado_em: '2026-01-28T12:00:00Z',
    atualizado_em: '2026-02-14T12:00:00Z',
  },
  {
    id: 9617,
    titulo: 'Empréstimo de notebooks e achados e perdidos',
    slug: 'emprestimo-de-notebooks-e-achados-e-perdidos',
    conteudo:
      'Empréstimo de notebooks: durante as aulas, você pode usar os notebooks da Faculdade conforme planejamento do professor. O agendamento é feito por ele, e a retirada/devolução acontece na sala de apoio da TI, no 1º subsolo.\n\n' +
      'Achados e perdidos: esqueceu algo na FacSenac? Os objetos e documentos encontrados são entregues na Central de Atendimento (térreo) e ficam guardados por até 6 meses. Depois desse prazo, documentos são incinerados e objetos são doados — então não demore para procurar!',
    status: 'publicado',
    secao_id: 9501,
    publicado_em: '2026-02-15T12:00:00Z',
    criado_em: '2026-02-01T12:00:00Z',
    atualizado_em: '2026-02-15T12:00:00Z',
  },
  {
    id: 9618,
    titulo: 'Carteirinha de estudante e eleição de representantes',
    slug: 'carteirinha-de-estudante-e-eleicao-de-representantes',
    conteudo:
      'Carteirinha de estudante: no início de cada semestre, a FacSenac convida uma empresa para confeccionar as carteirinhas, que garantem o direito legal à meia-entrada em eventos culturais.\n\n' +
      'Eleição de representantes: em datas marcadas no calendário acadêmico, cada turma elege seus representantes por meio de formulário. Os eleitos participam de reuniões periódicas com a Coordenação Acadêmica e do grupo de representantes no WhatsApp, repassando as informações para o restante da turma.',
    status: 'publicado',
    secao_id: 9501,
    publicado_em: '2026-02-16T12:00:00Z',
    criado_em: '2026-02-01T12:00:00Z',
    atualizado_em: '2026-02-16T12:00:00Z',
  },
  {
    id: 9619,
    titulo: 'Horários de funcionamento dos setores da FacSenac',
    slug: 'horarios-de-funcionamento-dos-setores-da-facsenac',
    conteudo:
      '• Aulas: matutino das 9h às 12h / noturno das 19h às 22h (segunda a sexta, graduação) e das 9h às 17h aos sábados (pós-graduação)\n' +
      '• Central de Atendimento: 9h às 21h (até 20h30 para pagamentos)\n' +
      '• Setor Financeiro e Secretaria Acadêmica: 9h às 21h, de segunda a sexta\n' +
      '• Biblioteca: 8h30 às 21h, de segunda a sexta\n' +
      '• Empréstimo de notebooks: 8h45 às 12h e 18h40 às 22h, conforme agendamento dos professores\n' +
      '• Coordenação de curso: horários no Moodle e na porta das salas, no 4º andar\n' +
      '• NADIS: atendimento mediante agendamento',
    status: 'publicado',
    secao_id: 9502,
    publicado_em: '2026-02-17T12:00:00Z',
    criado_em: '2026-02-01T12:00:00Z',
    atualizado_em: '2026-02-17T12:00:00Z',
  },
  {
    id: 9620,
    titulo: 'Contatos úteis da FacSenac-DF',
    slug: 'contatos-uteis-da-facsenac-df',
    conteudo:
      '• Biblioteca: (61) 3771-9811 — biblioteca@df.senac.br\n' +
      '• Central de Atendimento / WhatsApp: (61) 3771-9843\n' +
      '• Direção Geral: (61) 3771-9803\n' +
      '• Financeiro: (61) 3771-9807 — financeirofaculdade@df.senac.br\n' +
      '• NADIS: (61) 3771-9822 — silvaniamenezes@df.senac.br\n' +
      '• Relações Institucionais: (61) 3771-9812 — relacoesinstitucionais@df.senac.br\n' +
      '• Secretaria Acadêmica: (61) 3771-9806 — secretariaacademica@df.senac.br\n\n' +
      'Redes sociais: Instagram @facsenacdf · Facebook FaculdadeSenacDF · LinkedIn faculdadesenacdf',
    status: 'publicado',
    secao_id: 9502,
    publicado_em: '2026-02-18T12:00:00Z',
    criado_em: '2026-02-01T12:00:00Z',
    atualizado_em: '2026-02-18T12:00:00Z',
  },
]

export function categoriaExemploComSecoes(slug: string): CategoriaComSecoes | null {
  const categoria = categoriasExemplo.find(c => c.slug === slug)
  if (!categoria) return null
  return { ...categoria, secoes: secoesPorCategoria[slug] ?? [] }
}

export function artigoExemploPorSlug(slug: string): Artigo | null {
  return artigosExemplo.find(a => a.slug === slug) ?? null
}
