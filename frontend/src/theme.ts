// Identidade visual SENAC-DF.
// Referência principal: Guia do Aluno FacSenac-DF (degradê laranja → rosa,
// títulos em laranja, estrutura/textos em azul). Cores institucionais do
// Manual da Marca SENAC: Azul #004A8D (Pantone 288 C) e Laranja #F7941D
// (Pantone 144 C).
export const cores = {
  // --- Cores institucionais SENAC ---
  azul: '#004A8D',        // Azul Senac — estrutura, cabeçalhos, títulos
  azulEscuro: '#003566',  // variação para estados pressionados/contraste
  laranja: '#F7941D',     // Laranja Senac — destaques, ações, links
  laranjaClaro: '#FDC180',

  // Degradê assinatura do Guia do Aluno (laranja → rosa/coral).
  // Tupla `as const` para satisfazer o tipo `colors` do LinearGradient.
  gradiente: ['#F7941D', '#EC4D6E'] as const,

  // --- Neutros ---
  branco: '#FFFFFF',
  fundo: '#F4F6FA',       // fundo de tela (claro e levemente frio, como as páginas do guia)
  superficie: '#FFFFFF',  // cards e campos
  preto: '#152A41',       // texto principal (azul-marinho escuro, como o guia)
  cinza: '#5B6B7D',       // texto secundário
  borda: '#DCE3ED',       // bordas e divisores

  // --- Cores semânticas (status) ---
  sucesso: '#16a34a',
  alerta: '#ca8a04',
  erro: '#dc2626',
}
