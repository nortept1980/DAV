# STADA XML Generator - Importação de Veículos

Aplicação React para geração de ficheiros XML de declaração aduaneira de importação de veículos (STADA-Importação CAU) compatíveis com o portal da Autoridade Tributária portuguesa.

## Funcionalidades

- **Wizard Multi-Step** com 6 passos intuitivos:
  1. Tipo de Processo (Normal/Emigrante/Isenção IVA)
  2. Dados do Veículo (VIN, Marca, Modelo, CO2, etc.)
  3. Partes (Exportador, Importador)
  4. Valor e Transporte
  5. Documentos de Suporte
  6. Revisão e Geração XML

- **Validações em tempo real:**
  - VIN: 17 caracteres, sem I/O/Q
  - NIF português: 9 dígitos, validação módulo 11
  - Datas: formato AAAA-MM-DD
  - CO2: número inteiro positivo
  - Código NC: 8 dígitos numéricos
  - Código TARIC: 10 dígitos numéricos

- **Campos condicionais:**
  - Se USADO: obrigatório matrícula estrangeira e data 1ª matrícula
  - Se EMIGRANTE: adiciona C01 aos regimes adicionais
  - Se ISENÇÃO IVA: adiciona 410 aos regimes adicionais
  - Se HÍBRIDO: obrigatório autonomia bateria

- **Funcionalidades adicionais:**
  - Botão "Gerar XML" que produz ficheiro para download
  - Botão "Copiar XML" para clipboard
  - Preview do XML formatado com syntax highlighting
  - Guardar rascunhos em localStorage
  - Carregar dados de JSON importado

## Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```

## Tecnologias

- React 18
- Vite
- Tailwind CSS
- Lucide React (ícones)

## Estrutura XML

O XML gerado segue a estrutura oficial do STADA-Importação CAU v1.4 com:

- **Cabeçalho**: Tipo de declaração, referência local, valor, estâncias
- **Partes**: Exportador, Importador, Declarante, Representante
- **Adições**: Mercadoria, códigos pautais, informações adicionais específicas para veículos (códigos G1xxx)
- **Transporte**: Modo, meio de transporte, documentos

### Códigos de Informação Adicional (Veículos)

| Código | Descrição |
|--------|-----------|
| G1HTV | Homologação nacional IMT |
| G1MAV | Marca do veículo |
| G1MDV | Modelo do veículo |
| G1CTV | Categoria (M1, N1, L3e, etc.) |
| G1QFV | Qualificador (N=novo, U=usado) |
| G1TFV | Tipo fiscal (001, 004, 04B, etc.) |
| G1TTV | Tipo teste CO2 (NEDC/WLTP) |
| G1COV | Emissões CO2 g/km |
| G1MTV | Matrícula estrangeira (se usado) |
| G1DMV | Data 1ª matrícula (se usado) |
| G1BTV | Autonomia bateria km (se híbrido) |

## Utilização

1. Selecione o tipo de processo de importação
2. Preencha os dados do veículo
3. Indique as partes envolvidas (exportador e importador)
4. Insira o valor comercial e dados de transporte
5. Adicione as referências dos documentos de suporte
6. Revise os dados e gere o ficheiro XML

O ficheiro XML gerado pode ser carregado diretamente no portal STADA da Autoridade Tributária.

## Licença

Este projeto é de uso interno.
