import React, { useState, useEffect, useCallback } from 'react';
import {
  Car,
  FileText,
  Users,
  Truck,
  ClipboardList,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  Copy,
  Save,
  Upload,
  AlertCircle,
  Check,
  X,
  Info,
  FileCode,
  Trash2
} from 'lucide-react';

// ============================================
// CONSTANTES E DADOS DE REFERÊNCIA
// ============================================

const ESTANCIAS_ADUANEIRAS = [
  { codigo: 'PTLSB', nome: 'Lisboa/Aeroporto' },
  { codigo: 'PTPTM', nome: 'Porto/Leixões' },
  { codigo: 'PTFAR', nome: 'Faro' },
  { codigo: 'PTFUN', nome: 'Funchal' },
  { codigo: 'PTPDL', nome: 'Ponta Delgada' },
  { codigo: 'PTSET', nome: 'Setúbal' },
  { codigo: 'PTAVR', nome: 'Aveiro' },
  { codigo: 'PTSIE', nome: 'Sines' },
];

const CODIGOS_NC_VEICULOS = [
  { codigo: '87032110', descricao: 'Gasolina ≤1000cc' },
  { codigo: '87032190', descricao: 'Gasolina >1000cc ≤1500cc' },
  { codigo: '87032290', descricao: 'Gasolina >1500cc ≤3000cc' },
  { codigo: '87032390', descricao: 'Gasolina >3000cc' },
  { codigo: '87033110', descricao: 'Gasóleo ≤1500cc' },
  { codigo: '87033190', descricao: 'Gasóleo >1500cc ≤2500cc' },
  { codigo: '87033290', descricao: 'Gasóleo >2500cc' },
  { codigo: '87034010', descricao: 'Híbrido gasolina' },
  { codigo: '87034090', descricao: 'Híbrido gasóleo' },
  { codigo: '87038010', descricao: 'Elétrico' },
  { codigo: '87112010', descricao: 'Motociclo 50-250cc' },
  { codigo: '87112090', descricao: 'Motociclo 250-500cc' },
  { codigo: '87113000', descricao: 'Motociclo >500cc' },
];

const TIPOS_FISCAIS = [
  { codigo: '001', descricao: 'Ligeiro passageiros gasolina' },
  { codigo: '004', descricao: 'Ligeiro passageiros gasóleo' },
  { codigo: '04B', descricao: 'Ligeiro passageiros híbrido plug-in' },
  { codigo: '04C', descricao: 'Ligeiro passageiros elétrico' },
  { codigo: '002', descricao: 'Ligeiro mercadorias até 2500kg' },
  { codigo: '003', descricao: 'Motociclos/ciclomotores' },
];

const CATEGORIAS_VEICULOS = [
  { codigo: 'M1', descricao: 'Passageiros até 9 lugares' },
  { codigo: 'M2', descricao: 'Passageiros >9 lugares até 5t' },
  { codigo: 'M3', descricao: 'Passageiros >9 lugares >5t' },
  { codigo: 'N1', descricao: 'Mercadorias até 3.5t' },
  { codigo: 'N2', descricao: 'Mercadorias >3.5t até 12t' },
  { codigo: 'N3', descricao: 'Mercadorias >12t' },
  { codigo: 'L1e', descricao: 'Ciclomotor 2 rodas' },
  { codigo: 'L3e', descricao: 'Motociclo 2 rodas' },
  { codigo: 'L4e', descricao: 'Motociclo com carro lateral' },
  { codigo: 'L5e', descricao: 'Triciclo' },
  { codigo: 'L6e', descricao: 'Quadriciclo ligeiro' },
  { codigo: 'L7e', descricao: 'Quadriciclo pesado' },
];

const MODOS_TRANSPORTE = [
  { codigo: '1', descricao: 'Marítimo' },
  { codigo: '2', descricao: 'Ferroviário' },
  { codigo: '3', descricao: 'Rodoviário' },
  { codigo: '4', descricao: 'Aéreo' },
];

const MOEDAS = [
  { codigo: 'EUR', descricao: 'Euro' },
  { codigo: 'CHF', descricao: 'Franco Suíço' },
  { codigo: 'GBP', descricao: 'Libra Esterlina' },
  { codigo: 'USD', descricao: 'Dólar Americano' },
];

const PAISES = [
  { codigo: 'CH', nome: 'Suíça' },
  { codigo: 'GB', nome: 'Reino Unido' },
  { codigo: 'DE', nome: 'Alemanha' },
  { codigo: 'FR', nome: 'França' },
  { codigo: 'ES', nome: 'Espanha' },
  { codigo: 'IT', nome: 'Itália' },
  { codigo: 'BE', nome: 'Bélgica' },
  { codigo: 'NL', nome: 'Países Baixos' },
  { codigo: 'AT', nome: 'Áustria' },
  { codigo: 'US', nome: 'Estados Unidos' },
  { codigo: 'JP', nome: 'Japão' },
  { codigo: 'PT', nome: 'Portugal' },
];

const DOCUMENTOS_SUPORTE = [
  { tipo: 'N380', descricao: 'Fatura comercial' },
  { tipo: 'N830', descricao: 'Certificado de matrícula estrangeiro' },
  { tipo: '1ZZ4', descricao: 'Habilitação Art.433º' },
  { tipo: '3X06', descricao: 'Reconhecimento de franquia' },
  { tipo: 'C400', descricao: 'COC - Certificado de Conformidade' },
  { tipo: '3E35', descricao: 'Certificado de inspeção técnica' },
  { tipo: 'N730', descricao: 'CMR (conhecimento rodoviário)' },
  { tipo: 'N740', descricao: 'AWB (conhecimento aéreo)' },
  { tipo: 'N337', descricao: 'DDT (Declaração Detalhada de Trânsito)' },
];

const INCOTERMS = [
  { codigo: 'EXW', descricao: 'Ex Works' },
  { codigo: 'FCA', descricao: 'Free Carrier' },
  { codigo: 'CPT', descricao: 'Carriage Paid To' },
  { codigo: 'CIP', descricao: 'Carriage Insurance Paid' },
  { codigo: 'DAP', descricao: 'Delivered At Place' },
  { codigo: 'DPU', descricao: 'Delivered at Place Unloaded' },
  { codigo: 'DDP', descricao: 'Delivered Duty Paid' },
  { codigo: 'FOB', descricao: 'Free On Board' },
  { codigo: 'CFR', descricao: 'Cost and Freight' },
  { codigo: 'CIF', descricao: 'Cost Insurance Freight' },
];

// ============================================
// ESTADO INICIAL
// ============================================

const getInitialState = () => ({
  // Tipo de processo
  tipoProcesso: 'normal',

  // Dados veículo
  vin: '',
  marca: '',
  modelo: '',
  categoria: 'M1',
  qualificador: 'U',
  tipoFiscal: '001',
  co2: '',
  tipoTesteCO2: 'WLTP',
  matriculaEstrangeira: '',
  dataPrimeiraMatricula: '',
  autonomiaBateria: '',
  combustivel: 'gasolina',
  cilindrada: '',
  massaBruta: '',
  massaLiquida: '',

  // Códigos pautais
  codigoNC: '87032190',
  codigoTARIC: '8703219000',
  homologacao: '',

  // Valor
  valorFaturado: '',
  moeda: 'EUR',
  taxaCambio: '',
  incoterm: 'EXW',

  // Partes
  exportador: {
    nome: '',
    morada: '',
    codPostal: '',
    localidade: '',
    pais: 'CH'
  },
  importador: {
    nif: '',
    nome: '',
    morada: '',
    codPostal: '',
    localidade: '',
    pais: 'PT'
  },

  // Transporte
  modoTransporte: '3',
  matriculaCamiao: '',
  paisTransporte: 'PT',
  numCMR: '',
  mrnDDT: '',

  // Documentos
  numFatura: '',
  refCertificadoMatricula: '',
  numHabilitacao: '',
  numReconhecimentoFranquia: '',
  numCOC: '',
  numInspecao: '',

  // Estâncias
  estanciaApresentacao: 'PTLSB',
  estanciaControlo: 'PTLSB',

  // Referência
  nrl: '',
});

// ============================================
// FUNÇÕES DE VALIDAÇÃO
// ============================================

const validateVIN = (vin) => {
  if (!vin) return { valid: false, message: 'VIN é obrigatório' };
  if (vin.length !== 17) return { valid: false, message: 'VIN deve ter 17 caracteres' };
  if (/[IOQ]/i.test(vin)) return { valid: false, message: 'VIN não pode conter I, O ou Q' };
  if (!/^[A-HJ-NPR-Z0-9]{17}$/i.test(vin)) return { valid: false, message: 'VIN contém caracteres inválidos' };
  return { valid: true, message: '' };
};

const validateNIF = (nif) => {
  if (!nif) return { valid: false, message: 'NIF é obrigatório' };
  if (!/^\d{9}$/.test(nif)) return { valid: false, message: 'NIF deve ter 9 dígitos' };

  // Validação módulo 11
  const checkDigit = parseInt(nif[8]);
  let sum = 0;
  for (let i = 0; i < 8; i++) {
    sum += parseInt(nif[i]) * (9 - i);
  }
  const remainder = sum % 11;
  const expectedCheck = remainder < 2 ? 0 : 11 - remainder;

  if (checkDigit !== expectedCheck) {
    return { valid: false, message: 'NIF inválido (dígito de controlo)' };
  }

  return { valid: true, message: '' };
};

const validateDate = (date) => {
  if (!date) return { valid: false, message: 'Data é obrigatória' };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return { valid: false, message: 'Formato deve ser AAAA-MM-DD' };
  }
  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) {
    return { valid: false, message: 'Data inválida' };
  }
  return { valid: true, message: '' };
};

const validateCO2 = (co2) => {
  if (!co2) return { valid: false, message: 'CO2 é obrigatório' };
  const num = parseInt(co2);
  if (isNaN(num) || num < 0 || num > 500) {
    return { valid: false, message: 'CO2 deve ser entre 0 e 500 g/km' };
  }
  return { valid: true, message: '' };
};

const validateNC = (nc) => {
  if (!nc) return { valid: false, message: 'Código NC é obrigatório' };
  if (!/^\d{8}$/.test(nc)) {
    return { valid: false, message: 'Código NC deve ter 8 dígitos' };
  }
  return { valid: true, message: '' };
};

const validateTARIC = (taric) => {
  if (!taric) return { valid: false, message: 'Código TARIC é obrigatório' };
  if (!/^\d{10}$/.test(taric)) {
    return { valid: false, message: 'Código TARIC deve ter 10 dígitos' };
  }
  return { valid: true, message: '' };
};

const validateCodPostalPT = (cp) => {
  if (!cp) return { valid: false, message: 'Código postal é obrigatório' };
  if (!/^\d{4}-\d{3}$/.test(cp)) {
    return { valid: false, message: 'Formato deve ser XXXX-XXX' };
  }
  return { valid: true, message: '' };
};

const validateMRN = (mrn) => {
  if (!mrn) return { valid: true, message: '' }; // Opcional
  if (!/^[0-9]{2}[A-Z]{2}[A-Z0-9]{14}[0-9]$/.test(mrn)) {
    return { valid: false, message: 'Formato MRN inválido' };
  }
  return { valid: true, message: '' };
};

// ============================================
// COMPONENTES UI
// ============================================

const InputField = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
  validation,
  info,
  disabled = false,
  maxLength
}) => {
  const [touched, setTouched] = useState(false);
  const showError = touched && validation && !validation.valid;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-1">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
        {info && (
          <span className="ml-2 text-gray-500 text-xs">({info})</span>
        )}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setTouched(true)}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors ${
          showError
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-600 focus:ring-dinave-500'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
      {showError && (
        <p className="mt-1 text-sm text-red-400 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          {validation.message}
        </p>
      )}
    </div>
  );
};

const SelectField = ({
  label,
  value,
  onChange,
  options,
  required = false,
  info,
  disabled = false
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-300 mb-1">
      {label}
      {required && <span className="text-red-400 ml-1">*</span>}
      {info && (
        <span className="ml-2 text-gray-500 text-xs">({info})</span>
      )}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dinave-500 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {options.map((opt) => (
        <option key={opt.codigo || opt.value} value={opt.codigo || opt.value}>
          {opt.descricao || opt.nome || opt.label}
        </option>
      ))}
    </select>
  </div>
);

const RadioGroup = ({ label, value, onChange, options, required = false }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-300 mb-2">
      {label}
      {required && <span className="text-red-400 ml-1">*</span>}
    </label>
    <div className="flex flex-wrap gap-4">
      {options.map((opt) => (
        <label
          key={opt.value}
          className={`flex items-center px-4 py-2 rounded-lg cursor-pointer transition-colors ${
            value === opt.value
              ? 'bg-dinave-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          <input
            type="radio"
            value={opt.value}
            checked={value === opt.value}
            onChange={(e) => onChange(e.target.value)}
            className="sr-only"
          />
          <span>{opt.label}</span>
        </label>
      ))}
    </div>
  </div>
);

const StepIndicator = ({ steps, currentStep }) => (
  <div className="flex items-center justify-center mb-8 overflow-x-auto pb-2">
    {steps.map((step, index) => (
      <React.Fragment key={index}>
        <div className="flex flex-col items-center min-w-[80px]">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              index < currentStep
                ? 'bg-green-500 text-white'
                : index === currentStep
                  ? 'bg-dinave-500 text-gray-900'
                  : 'bg-gray-700 text-gray-400'
            }`}
          >
            {index < currentStep ? (
              <Check className="w-5 h-5" />
            ) : (
              step.icon
            )}
          </div>
          <span className={`text-xs mt-1 text-center ${
            index === currentStep ? 'text-dinave-400' : 'text-gray-500'
          }`}>
            {step.label}
          </span>
        </div>
        {index < steps.length - 1 && (
          <div className={`w-8 md:w-16 h-0.5 mx-1 ${
            index < currentStep ? 'bg-green-500' : 'bg-gray-700'
          }`} />
        )}
      </React.Fragment>
    ))}
  </div>
);

const Alert = ({ type = 'info', children }) => {
  const styles = {
    info: 'bg-blue-900/30 border-blue-700 text-blue-300',
    warning: 'bg-yellow-900/30 border-yellow-700 text-yellow-300',
    error: 'bg-red-900/30 border-red-700 text-red-300',
    success: 'bg-green-900/30 border-green-700 text-green-300',
  };

  return (
    <div className={`p-4 rounded-lg border ${styles[type]} mb-4`}>
      <div className="flex items-start">
        <Info className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
        <div>{children}</div>
      </div>
    </div>
  );
};

// ============================================
// COMPONENTES DE PASSOS
// ============================================

const Step1TipoProcesso = ({ data, updateData }) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
      <FileText className="w-6 h-6 mr-2 text-dinave-400" />
      Tipo de Processo
    </h2>

    <Alert type="info">
      Selecione o tipo de processo de importação. Esta escolha afetará os regimes aduaneiros
      e documentos necessários.
    </Alert>

    <RadioGroup
      label="Tipo de Processo de Importação"
      value={data.tipoProcesso}
      onChange={(v) => updateData({ tipoProcesso: v })}
      required
      options={[
        { value: 'normal', label: 'Importação Normal' },
        { value: 'emigrante', label: 'Emigrante (Franquia)' },
        { value: 'isencaoIVA', label: 'Isenção de IVA' },
      ]}
    />

    {data.tipoProcesso === 'emigrante' && (
      <Alert type="warning">
        Para processos de emigrante, será necessário o documento de Reconhecimento de Franquia (3X06)
        e será adicionado o regime adicional C01.
      </Alert>
    )}

    {data.tipoProcesso === 'isencaoIVA' && (
      <Alert type="warning">
        Para processos com isenção de IVA, será adicionado o regime adicional 410.
        Certifique-se de ter a documentação de suporte adequada.
      </Alert>
    )}

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <SelectField
        label="Estância de Apresentação"
        value={data.estanciaApresentacao}
        onChange={(v) => updateData({ estanciaApresentacao: v })}
        options={ESTANCIAS_ADUANEIRAS.map(e => ({ codigo: e.codigo, descricao: `${e.codigo} - ${e.nome}` }))}
        required
      />
      <SelectField
        label="Estância de Controlo"
        value={data.estanciaControlo}
        onChange={(v) => updateData({ estanciaControlo: v })}
        options={ESTANCIAS_ADUANEIRAS.map(e => ({ codigo: e.codigo, descricao: `${e.codigo} - ${e.nome}` }))}
        required
      />
    </div>

    <InputField
      label="Número de Referência Local (NRL)"
      value={data.nrl}
      onChange={(v) => updateData({ nrl: v })}
      placeholder="Ex: IMP2024001"
      info="Referência interna da declaração"
    />
  </div>
);

const Step2DadosVeiculo = ({ data, updateData }) => {
  const isHibrido = data.codigoNC.startsWith('870340');
  const isUsado = data.qualificador === 'U';

  const handleNCChange = (nc) => {
    updateData({
      codigoNC: nc,
      codigoTARIC: nc + '00'
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
        <Car className="w-6 h-6 mr-2 text-dinave-400" />
        Dados do Veículo
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <InputField
            label="VIN (Vehicle Identification Number)"
            value={data.vin}
            onChange={(v) => updateData({ vin: v.toUpperCase() })}
            placeholder="Ex: WVWZZZ3CZWE123456"
            required
            maxLength={17}
            validation={validateVIN(data.vin)}
            info="17 caracteres, sem I/O/Q"
          />
        </div>

        <InputField
          label="Marca"
          value={data.marca}
          onChange={(v) => updateData({ marca: v.toUpperCase() })}
          placeholder="Ex: AUDI"
          required
        />

        <InputField
          label="Modelo"
          value={data.modelo}
          onChange={(v) => updateData({ modelo: v })}
          placeholder="Ex: RS3 SPORTBACK"
          required
        />

        <SelectField
          label="Categoria"
          value={data.categoria}
          onChange={(v) => updateData({ categoria: v })}
          options={CATEGORIAS_VEICULOS.map(c => ({ codigo: c.codigo, descricao: `${c.codigo} - ${c.descricao}` }))}
          required
        />

        <RadioGroup
          label="Estado do Veículo"
          value={data.qualificador}
          onChange={(v) => updateData({ qualificador: v })}
          required
          options={[
            { value: 'N', label: 'Novo' },
            { value: 'U', label: 'Usado' },
          ]}
        />

        <SelectField
          label="Tipo Fiscal"
          value={data.tipoFiscal}
          onChange={(v) => updateData({ tipoFiscal: v })}
          options={TIPOS_FISCAIS.map(t => ({ codigo: t.codigo, descricao: `${t.codigo} - ${t.descricao}` }))}
          required
        />

        <SelectField
          label="Código NC"
          value={data.codigoNC}
          onChange={handleNCChange}
          options={CODIGOS_NC_VEICULOS.map(c => ({ codigo: c.codigo, descricao: `${c.codigo} - ${c.descricao}` }))}
          required
        />

        <InputField
          label="Código TARIC"
          value={data.codigoTARIC}
          onChange={(v) => updateData({ codigoTARIC: v })}
          placeholder="10 dígitos"
          required
          maxLength={10}
          validation={validateTARIC(data.codigoTARIC)}
        />

        <InputField
          label="Homologação Nacional (IMT)"
          value={data.homologacao}
          onChange={(v) => updateData({ homologacao: v })}
          placeholder="Ex: e13*2018/858*11054*00"
        />
      </div>

      <h3 className="text-lg font-medium text-white mt-6 mb-4">Emissões e Características</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Emissões CO2 (g/km)"
          value={data.co2}
          onChange={(v) => updateData({ co2: v })}
          type="number"
          placeholder="Ex: 149"
          required
          validation={data.co2 ? validateCO2(data.co2) : { valid: true }}
        />

        <RadioGroup
          label="Tipo de Teste CO2"
          value={data.tipoTesteCO2}
          onChange={(v) => updateData({ tipoTesteCO2: v })}
          required
          options={[
            { value: 'WLTP', label: 'WLTP' },
            { value: 'NEDC', label: 'NEDC' },
          ]}
        />

        <InputField
          label="Cilindrada (cc)"
          value={data.cilindrada}
          onChange={(v) => updateData({ cilindrada: v })}
          type="number"
          placeholder="Ex: 2480"
        />

        <SelectField
          label="Combustível"
          value={data.combustivel}
          onChange={(v) => updateData({ combustivel: v })}
          options={[
            { value: 'gasolina', label: 'Gasolina' },
            { value: 'gasoleo', label: 'Gasóleo' },
            { value: 'hibrido_gasolina', label: 'Híbrido Gasolina' },
            { value: 'hibrido_gasoleo', label: 'Híbrido Gasóleo' },
            { value: 'eletrico', label: 'Elétrico' },
            { value: 'gpl', label: 'GPL' },
          ]}
        />

        <InputField
          label="Massa Bruta (kg)"
          value={data.massaBruta}
          onChange={(v) => updateData({ massaBruta: v })}
          type="number"
          placeholder="Ex: 1850"
          required
        />

        <InputField
          label="Massa Líquida (kg)"
          value={data.massaLiquida}
          onChange={(v) => updateData({ massaLiquida: v })}
          type="number"
          placeholder="Ex: 1650"
          required
        />

        {isHibrido && (
          <InputField
            label="Autonomia Bateria (km)"
            value={data.autonomiaBateria}
            onChange={(v) => updateData({ autonomiaBateria: v })}
            type="number"
            placeholder="Ex: 50"
            required
            info="Obrigatório para híbridos"
          />
        )}
      </div>

      {isUsado && (
        <>
          <h3 className="text-lg font-medium text-white mt-6 mb-4">Dados Veículo Usado</h3>
          <Alert type="info">
            Para veículos usados, é obrigatório indicar a matrícula estrangeira e data da primeira matrícula.
          </Alert>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Matrícula Estrangeira"
              value={data.matriculaEstrangeira}
              onChange={(v) => updateData({ matriculaEstrangeira: v.toUpperCase() })}
              placeholder="Ex: ZH 123456"
              required
            />
            <InputField
              label="Data 1ª Matrícula"
              value={data.dataPrimeiraMatricula}
              onChange={(v) => updateData({ dataPrimeiraMatricula: v })}
              type="date"
              required
              validation={data.dataPrimeiraMatricula ? validateDate(data.dataPrimeiraMatricula) : { valid: true }}
            />
          </div>
        </>
      )}
    </div>
  );
};

const Step3Partes = ({ data, updateData }) => {
  const updateExportador = (field, value) => {
    updateData({
      exportador: { ...data.exportador, [field]: value }
    });
  };

  const updateImportador = (field, value) => {
    updateData({
      importador: { ...data.importador, [field]: value }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
        <Users className="w-6 h-6 mr-2 text-dinave-400" />
        Partes Envolvidas
      </h2>

      {/* Exportador */}
      <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
        <h3 className="text-lg font-medium text-dinave-400 mb-4">Exportador</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Nome"
            value={data.exportador.nome}
            onChange={(v) => updateExportador('nome', v)}
            placeholder="Nome do exportador"
            required
          />
          <SelectField
            label="País"
            value={data.exportador.pais}
            onChange={(v) => updateExportador('pais', v)}
            options={PAISES.map(p => ({ codigo: p.codigo, descricao: `${p.codigo} - ${p.nome}` }))}
            required
          />
          <div className="md:col-span-2">
            <InputField
              label="Morada"
              value={data.exportador.morada}
              onChange={(v) => updateExportador('morada', v)}
              placeholder="Rua e número"
              required
            />
          </div>
          <InputField
            label="Código Postal"
            value={data.exportador.codPostal}
            onChange={(v) => updateExportador('codPostal', v)}
            placeholder="Ex: 8001"
          />
          <InputField
            label="Localidade"
            value={data.exportador.localidade}
            onChange={(v) => updateExportador('localidade', v)}
            placeholder="Ex: Zürich"
            required
          />
        </div>
      </div>

      {/* Importador */}
      <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
        <h3 className="text-lg font-medium text-dinave-400 mb-4">Importador</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="NIF"
            value={data.importador.nif}
            onChange={(v) => updateImportador('nif', v)}
            placeholder="9 dígitos"
            required
            maxLength={9}
            validation={validateNIF(data.importador.nif)}
            info="NIF português válido"
          />
          <InputField
            label="Nome"
            value={data.importador.nome}
            onChange={(v) => updateImportador('nome', v)}
            placeholder="Nome do importador"
            required
          />
          <div className="md:col-span-2">
            <InputField
              label="Morada"
              value={data.importador.morada}
              onChange={(v) => updateImportador('morada', v)}
              placeholder="Rua e número"
              required
            />
          </div>
          <InputField
            label="Código Postal"
            value={data.importador.codPostal}
            onChange={(v) => updateImportador('codPostal', v)}
            placeholder="XXXX-XXX"
            required
            validation={data.importador.codPostal ? validateCodPostalPT(data.importador.codPostal) : { valid: true }}
          />
          <InputField
            label="Localidade"
            value={data.importador.localidade}
            onChange={(v) => updateImportador('localidade', v)}
            placeholder="Ex: Lisboa"
            required
          />
        </div>
      </div>

      <Alert type="info">
        O Declarante e Representante serão preenchidos automaticamente com os dados da DINAVE.
      </Alert>
    </div>
  );
};

const Step4ValorTransporte = ({ data, updateData }) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
      <Truck className="w-6 h-6 mr-2 text-dinave-400" />
      Valor e Transporte
    </h2>

    {/* Valor */}
    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
      <h3 className="text-lg font-medium text-dinave-400 mb-4">Valor Comercial</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputField
          label="Valor Faturado"
          value={data.valorFaturado}
          onChange={(v) => updateData({ valorFaturado: v })}
          type="number"
          placeholder="Ex: 45000"
          required
        />
        <SelectField
          label="Moeda"
          value={data.moeda}
          onChange={(v) => updateData({ moeda: v })}
          options={MOEDAS.map(m => ({ codigo: m.codigo, descricao: `${m.codigo} - ${m.descricao}` }))}
          required
        />
        {data.moeda !== 'EUR' && (
          <InputField
            label="Taxa de Câmbio"
            value={data.taxaCambio}
            onChange={(v) => updateData({ taxaCambio: v })}
            type="number"
            placeholder="Ex: 0.95"
            required
            info="1 EUR = X moeda"
          />
        )}
        <SelectField
          label="Incoterm"
          value={data.incoterm}
          onChange={(v) => updateData({ incoterm: v })}
          options={INCOTERMS.map(i => ({ codigo: i.codigo, descricao: `${i.codigo} - ${i.descricao}` }))}
        />
      </div>
    </div>

    {/* Transporte */}
    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
      <h3 className="text-lg font-medium text-dinave-400 mb-4">Transporte</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          label="Modo de Transporte na Fronteira"
          value={data.modoTransporte}
          onChange={(v) => updateData({ modoTransporte: v })}
          options={MODOS_TRANSPORTE.map(m => ({ codigo: m.codigo, descricao: `${m.codigo} - ${m.descricao}` }))}
          required
        />
        <SelectField
          label="País do Transporte"
          value={data.paisTransporte}
          onChange={(v) => updateData({ paisTransporte: v })}
          options={PAISES.map(p => ({ codigo: p.codigo, descricao: `${p.codigo} - ${p.nome}` }))}
          required
        />
        <InputField
          label="Matrícula do Camião/Reboque"
          value={data.matriculaCamiao}
          onChange={(v) => updateData({ matriculaCamiao: v.toUpperCase() })}
          placeholder="Ex: AA-00-AA"
        />
        <InputField
          label="Número CMR/AWB"
          value={data.numCMR}
          onChange={(v) => updateData({ numCMR: v })}
          placeholder="Número do conhecimento de transporte"
        />
        <div className="md:col-span-2">
          <InputField
            label="MRN da DDT (Documento Precedente)"
            value={data.mrnDDT}
            onChange={(v) => updateData({ mrnDDT: v.toUpperCase() })}
            placeholder="Ex: 24PT123456789012345"
            validation={validateMRN(data.mrnDDT)}
            info="Movimento Reference Number da Declaração de Trânsito"
          />
        </div>
      </div>
    </div>
  </div>
);

const Step5Documentos = ({ data, updateData }) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
      <ClipboardList className="w-6 h-6 mr-2 text-dinave-400" />
      Documentos de Suporte
    </h2>

    <Alert type="info">
      Indique as referências dos documentos de suporte. Estes documentos devem ser
      carregados no portal da AT aquando da submissão da declaração.
    </Alert>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField
        label="Nº Fatura Comercial (N380)"
        value={data.numFatura}
        onChange={(v) => updateData({ numFatura: v })}
        placeholder="Ex: INV-2024-001"
        required
      />
      <InputField
        label="Ref. Certificado Matrícula (N830)"
        value={data.refCertificadoMatricula}
        onChange={(v) => updateData({ refCertificadoMatricula: v })}
        placeholder="Referência do documento"
      />
      <InputField
        label="Nº Habilitação Art.433º (1ZZ4)"
        value={data.numHabilitacao}
        onChange={(v) => updateData({ numHabilitacao: v })}
        placeholder="Ex: HAB-2024-001"
        required
        info="Habilitação para Despacho"
      />
      {data.tipoProcesso === 'emigrante' && (
        <InputField
          label="Nº Reconhecimento Franquia (3X06)"
          value={data.numReconhecimentoFranquia}
          onChange={(v) => updateData({ numReconhecimentoFranquia: v })}
          placeholder="Ex: RF-2024-001"
          required
        />
      )}
      <InputField
        label="Nº COC - Cert. Conformidade (C400)"
        value={data.numCOC}
        onChange={(v) => updateData({ numCOC: v })}
        placeholder="Ex: e13*2018/858*11054*00"
      />
      <InputField
        label="Nº Inspeção Técnica (3E35)"
        value={data.numInspecao}
        onChange={(v) => updateData({ numInspecao: v })}
        placeholder="Certificado de inspeção"
      />
    </div>

    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 mt-6">
      <h3 className="text-lg font-medium text-dinave-400 mb-4">Documentos Necessários</h3>
      <ul className="space-y-2 text-gray-300">
        {DOCUMENTOS_SUPORTE.map((doc) => (
          <li key={doc.tipo} className="flex items-center">
            <span className="bg-gray-700 text-dinave-400 px-2 py-0.5 rounded text-sm font-mono mr-2">
              {doc.tipo}
            </span>
            {doc.descricao}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const Step6Revisao = ({ data, xmlContent, onGenerateXML }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(xmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `STADA_${data.nrl || 'declaracao'}_${new Date().toISOString().split('T')[0]}.xml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const highlightXML = (xml) => {
    return xml
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/(&lt;\/?[\w:]+)/g, '<span class="xml-tag">$1</span>')
      .replace(/(\w+)=/g, '<span class="xml-attr">$1</span>=')
      .replace(/"([^"]*)"/g, '"<span class="xml-value">$1</span>"')
      .replace(/&gt;([^&<]+)&lt;/g, '&gt;<span class="xml-content">$1</span>&lt;');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
        <CheckCircle className="w-6 h-6 mr-2 text-dinave-400" />
        Revisão e Geração XML
      </h2>

      {/* Resumo dos dados */}
      <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
        <h3 className="text-lg font-medium text-dinave-400 mb-4">Resumo da Declaração</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Tipo:</span>
            <span className="ml-2 text-white capitalize">{data.tipoProcesso}</span>
          </div>
          <div>
            <span className="text-gray-500">VIN:</span>
            <span className="ml-2 text-white font-mono">{data.vin}</span>
          </div>
          <div>
            <span className="text-gray-500">Veículo:</span>
            <span className="ml-2 text-white">{data.marca} {data.modelo}</span>
          </div>
          <div>
            <span className="text-gray-500">Valor:</span>
            <span className="ml-2 text-white">{data.valorFaturado} {data.moeda}</span>
          </div>
          <div>
            <span className="text-gray-500">Importador:</span>
            <span className="ml-2 text-white">{data.importador.nome}</span>
          </div>
          <div>
            <span className="text-gray-500">NIF:</span>
            <span className="ml-2 text-white font-mono">{data.importador.nif}</span>
          </div>
          <div>
            <span className="text-gray-500">Estado:</span>
            <span className="ml-2 text-white">{data.qualificador === 'N' ? 'Novo' : 'Usado'}</span>
          </div>
          <div>
            <span className="text-gray-500">CO2:</span>
            <span className="ml-2 text-white">{data.co2} g/km ({data.tipoTesteCO2})</span>
          </div>
          <div>
            <span className="text-gray-500">Estância:</span>
            <span className="ml-2 text-white">{data.estanciaControlo}</span>
          </div>
        </div>
      </div>

      {/* Botões de ação */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={onGenerateXML}
          className="flex items-center px-6 py-3 bg-dinave-600 hover:bg-dinave-700 text-gray-900 font-semibold rounded-lg transition-colors"
        >
          <FileCode className="w-5 h-5 mr-2" />
          Gerar XML
        </button>
        <button
          onClick={handleCopy}
          disabled={!xmlContent}
          className={`flex items-center px-6 py-3 rounded-lg transition-colors font-semibold ${
            xmlContent
              ? 'bg-gray-700 hover:bg-gray-600 text-white'
              : 'bg-gray-800 text-gray-500 cursor-not-allowed'
          }`}
        >
          {copied ? <Check className="w-5 h-5 mr-2" /> : <Copy className="w-5 h-5 mr-2" />}
          {copied ? 'Copiado!' : 'Copiar XML'}
        </button>
        <button
          onClick={handleDownload}
          disabled={!xmlContent}
          className={`flex items-center px-6 py-3 rounded-lg transition-colors font-semibold ${
            xmlContent
              ? 'bg-green-700 hover:bg-green-600 text-white'
              : 'bg-gray-800 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Download className="w-5 h-5 mr-2" />
          Download XML
        </button>
      </div>

      {/* Preview XML */}
      {xmlContent && (
        <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
          <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center justify-between">
            <span className="text-sm text-gray-400">Preview XML</span>
            <span className="text-xs text-gray-500">{xmlContent.length} caracteres</span>
          </div>
          <pre
            className="xml-preview p-4 overflow-x-auto max-h-96 text-gray-300"
            dangerouslySetInnerHTML={{ __html: highlightXML(xmlContent) }}
          />
        </div>
      )}
    </div>
  );
};

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState(getInitialState());
  const [xmlContent, setXmlContent] = useState('');
  const [savedDrafts, setSavedDrafts] = useState([]);

  const steps = [
    { label: 'Processo', icon: <FileText className="w-5 h-5" /> },
    { label: 'Veículo', icon: <Car className="w-5 h-5" /> },
    { label: 'Partes', icon: <Users className="w-5 h-5" /> },
    { label: 'Valor', icon: <Truck className="w-5 h-5" /> },
    { label: 'Docs', icon: <ClipboardList className="w-5 h-5" /> },
    { label: 'Revisão', icon: <CheckCircle className="w-5 h-5" /> },
  ];

  // Carregar rascunhos do localStorage
  useEffect(() => {
    const drafts = localStorage.getItem('stada-drafts');
    if (drafts) {
      setSavedDrafts(JSON.parse(drafts));
    }
  }, []);

  const updateData = useCallback((updates) => {
    setData(prev => ({ ...prev, ...updates }));
  }, []);

  const saveDraft = () => {
    const draft = {
      id: Date.now(),
      date: new Date().toISOString(),
      nrl: data.nrl || `Rascunho ${savedDrafts.length + 1}`,
      vin: data.vin,
      data: data,
    };
    const newDrafts = [...savedDrafts, draft];
    setSavedDrafts(newDrafts);
    localStorage.setItem('stada-drafts', JSON.stringify(newDrafts));
  };

  const loadDraft = (draft) => {
    setData(draft.data);
    setCurrentStep(0);
  };

  const deleteDraft = (id) => {
    const newDrafts = savedDrafts.filter(d => d.id !== id);
    setSavedDrafts(newDrafts);
    localStorage.setItem('stada-drafts', JSON.stringify(newDrafts));
  };

  const resetForm = () => {
    setData(getInitialState());
    setXmlContent('');
    setCurrentStep(0);
  };

  const importJSON = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target.result);
          setData({ ...getInitialState(), ...imported });
        } catch (err) {
          alert('Erro ao importar ficheiro JSON');
        }
      };
      reader.readAsText(file);
    }
  };

  const generateXML = () => {
    const regimesAdicionais = [];
    if (data.tipoProcesso === 'emigrante') regimesAdicionais.push('C01');
    if (data.tipoProcesso === 'isencaoIVA') regimesAdicionais.push('410');

    const isUsado = data.qualificador === 'U';
    const isHibrido = data.codigoNC.startsWith('870340');

    const descricaoMercadoria = `${data.marca} ${data.modelo} - ${data.categoria} - ${data.combustivel.toUpperCase()} - ${data.cilindrada}CC - CO2: ${data.co2}g/km`;

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<DeclaracaoImportacao xmlns="urn:at:stada:impcau:v1">
  <Cabecalho>
    <!-- ED 11: Informação sobre a Mensagem -->
    <TipoDeclaracao>IM</TipoDeclaracao>
    <TipoDeclaracaoAdicional>A</TipoDeclaracaoAdicional>
    <NumReferenciaLocal>${escapeXML(data.nrl)}</NumReferenciaLocal>
    <!-- ED 14: Valor/Imposições ao nível da declaração -->
    <MontanteFaturado>${escapeXML(data.valorFaturado)}</MontanteFaturado>
    <MoedaFaturacao>${escapeXML(data.moeda)}</MoedaFaturacao>${data.moeda !== 'EUR' ? `
    <TaxaCambio>${escapeXML(data.taxaCambio)}</TaxaCambio>` : ''}
    <!-- ED 17: Estâncias -->
    <EstanciaApresentacao>${escapeXML(data.estanciaApresentacao)}</EstanciaApresentacao>
    <EstanciaControlo>${escapeXML(data.estanciaControlo)}</EstanciaControlo>
    <!-- ED 18: Identificação das mercadorias -->
    <MassaBrutaTotal>${escapeXML(data.massaBruta)}</MassaBrutaTotal>
  </Cabecalho>

  <Partes>
    <!-- ED 13.01: Exportador -->
    <Exportador>
      <Nome>${escapeXML(data.exportador.nome)}</Nome>
      <RuaNumero>${escapeXML(data.exportador.morada)}</RuaNumero>
      <CodPostal>${escapeXML(data.exportador.codPostal)}</CodPostal>
      <Localidade>${escapeXML(data.exportador.localidade)}</Localidade>
      <Pais>${escapeXML(data.exportador.pais)}</Pais>
    </Exportador>
    <!-- ED 13.04: Importador -->
    <Importador>
      <NumIdentificacao>${escapeXML(data.importador.nif)}</NumIdentificacao>
      <Nome>${escapeXML(data.importador.nome)}</Nome>
      <RuaNumero>${escapeXML(data.importador.morada)}</RuaNumero>
      <CodPostal>${escapeXML(data.importador.codPostal)}</CodPostal>
      <Localidade>${escapeXML(data.importador.localidade)}</Localidade>
      <Pais>PT</Pais>
    </Importador>
    <!-- ED 13.05: Declarante -->
    <Declarante>
      <NumIdentificacao>500123456</NumIdentificacao>
      <Nome>DINAVE</Nome>
    </Declarante>
    <!-- ED 13.06: Representante -->
    <Representante>
      <Estatuto>2</Estatuto>
      <NumIdentificacao>500123456</NumIdentificacao>
    </Representante>
  </Partes>

  <Adicoes>
    <Adicao numero="1">
      <!-- ED 11.09: Regime -->
      <RegimeSolicitado>40</RegimeSolicitado>
      <RegimePrecedente>00</RegimePrecedente>${regimesAdicionais.length > 0 ? `
      <!-- ED 11.10: Regime Adicional -->
      <RegimesAdicionais>${regimesAdicionais.map(r => `
        <Codigo>${r}</Codigo>`).join('')}
      </RegimesAdicionais>` : ''}
      <!-- ED 18: Mercadoria -->
      <DescricaoMercadoria>${escapeXML(descricaoMercadoria)}</DescricaoMercadoria>
      <CodNomenclatura>${escapeXML(data.codigoNC)}</CodNomenclatura>
      <CodTARIC>${escapeXML(data.codigoTARIC)}</CodTARIC>
      <MassaBruta>${escapeXML(data.massaBruta)}</MassaBruta>
      <MassaLiquida>${escapeXML(data.massaLiquida)}</MassaLiquida>
      <PaisOrigem>${escapeXML(data.exportador.pais)}</PaisOrigem>
      <MontanteAdicao>${escapeXML(data.valorFaturado)}</MontanteAdicao>
      <!-- Volumes -->
      <Volumes>
        <TipoVolumes>NE</TipoVolumes>
        <NumVolumes>1</NumVolumes>
        <MarcasExpedicao>${escapeXML(data.vin)}</MarcasExpedicao>
      </Volumes>
      <!-- ED 12.02: Informações Adicionais Veículos -->
      <InformacoesAdicionais>${data.homologacao ? `
        <Info codigo="G1HTV">${escapeXML(data.homologacao)}</Info>` : ''}
        <Info codigo="G1MAV">${escapeXML(data.marca)}</Info>
        <Info codigo="G1MDV">${escapeXML(data.modelo)}</Info>
        <Info codigo="G1CTV">${escapeXML(data.categoria)}</Info>
        <Info codigo="G1QFV">${escapeXML(data.qualificador)}</Info>
        <Info codigo="G1TFV">${escapeXML(data.tipoFiscal)}</Info>
        <Info codigo="G1TTV">${escapeXML(data.tipoTesteCO2)}</Info>
        <Info codigo="G1COV">${escapeXML(data.co2)}</Info>${isUsado ? `
        <Info codigo="G1MTV">${escapeXML(data.matriculaEstrangeira)}</Info>
        <Info codigo="G1DMV">${escapeXML(data.dataPrimeiraMatricula)}</Info>` : ''}${isHibrido && data.autonomiaBateria ? `
        <Info codigo="G1BTV">${escapeXML(data.autonomiaBateria)}</Info>` : ''}
      </InformacoesAdicionais>
      <!-- ED 12.01: Documentos de Suporte -->
      <DocumentosSuporte>
        <Documento tipo="N380" ref="${escapeXML(data.numFatura)}"/>${data.refCertificadoMatricula ? `
        <Documento tipo="N830" ref="${escapeXML(data.refCertificadoMatricula)}"/>` : ''}
        <Documento tipo="1ZZ4" ref="${escapeXML(data.numHabilitacao)}"/>${data.tipoProcesso === 'emigrante' && data.numReconhecimentoFranquia ? `
        <Documento tipo="3X06" ref="${escapeXML(data.numReconhecimentoFranquia)}"/>` : ''}${data.numCOC ? `
        <Documento tipo="C400" ref="${escapeXML(data.numCOC)}"/>` : ''}${data.numInspecao ? `
        <Documento tipo="3E35" ref="${escapeXML(data.numInspecao)}"/>` : ''}
      </DocumentosSuporte>${data.mrnDDT ? `
      <!-- ED 12.04: Documento Precedente -->
      <DocumentoPrecedente tipo="N337" ref="${escapeXML(data.mrnDDT)}"/>` : ''}
    </Adicao>
  </Adicoes>

  <Transporte>
    <!-- ED 19 -->
    <IndicadorContentor>0</IndicadorContentor>
    <ModoTransporteFronteira>${escapeXML(data.modoTransporte)}</ModoTransporteFronteira>
    <ModoTransporteInterior>3</ModoTransporteInterior>${data.matriculaCamiao ? `
    <MeioTransporteChegada>
      <TipoIdentificacao>21</TipoIdentificacao>
      <NumIdentificacao>${escapeXML(data.matriculaCamiao)}</NumIdentificacao>
      <Nacionalidade>${escapeXML(data.paisTransporte)}</Nacionalidade>
    </MeioTransporteChegada>` : ''}${data.numCMR ? `
    <DocumentoTransporte tipo="${data.modoTransporte === '4' ? 'N740' : 'N730'}" ref="${escapeXML(data.numCMR)}"/>` : ''}
  </Transporte>
</DeclaracaoImportacao>`;

    setXmlContent(xml);
  };

  const escapeXML = (str) => {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Step1TipoProcesso data={data} updateData={updateData} />;
      case 1:
        return <Step2DadosVeiculo data={data} updateData={updateData} />;
      case 2:
        return <Step3Partes data={data} updateData={updateData} />;
      case 3:
        return <Step4ValorTransporte data={data} updateData={updateData} />;
      case 4:
        return <Step5Documentos data={data} updateData={updateData} />;
      case 5:
        return <Step6Revisao data={data} xmlContent={xmlContent} onGenerateXML={generateXML} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-dinave-500 p-2 rounded-lg">
                <FileCode className="w-6 h-6 text-gray-900" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">STADA XML Generator</h1>
                <p className="text-sm text-gray-400">Importação de Veículos - CAU</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <label className="cursor-pointer flex items-center px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm">
                <Upload className="w-4 h-4 mr-2" />
                Importar JSON
                <input
                  type="file"
                  accept=".json"
                  onChange={importJSON}
                  className="hidden"
                />
              </label>
              <button
                onClick={saveDraft}
                className="flex items-center px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
              >
                <Save className="w-4 h-4 mr-2" />
                Guardar
              </button>
              <button
                onClick={resetForm}
                className="flex items-center px-3 py-2 bg-red-900/50 hover:bg-red-800/50 text-red-300 rounded-lg transition-colors text-sm"
              >
                <X className="w-4 h-4 mr-2" />
                Limpar
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Rascunhos guardados */}
        {savedDrafts.length > 0 && currentStep === 0 && (
          <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-4 mb-6">
            <h3 className="text-sm font-medium text-gray-300 mb-3">Rascunhos Guardados</h3>
            <div className="flex flex-wrap gap-2">
              {savedDrafts.map((draft) => (
                <div
                  key={draft.id}
                  className="flex items-center bg-gray-700 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => loadDraft(draft)}
                    className="px-3 py-2 text-sm text-white hover:bg-gray-600 transition-colors"
                  >
                    {draft.nrl} {draft.vin && `- ${draft.vin.substring(0, 8)}...`}
                  </button>
                  <button
                    onClick={() => deleteDraft(draft.id)}
                    className="px-2 py-2 text-red-400 hover:bg-red-900/50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Indicador de progresso */}
        <StepIndicator steps={steps} currentStep={currentStep} />

        {/* Conteúdo do passo */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
          {renderStep()}
        </div>

        {/* Navegação */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep(prev => prev - 1)}
            disabled={currentStep === 0}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              currentStep === 0
                ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Anterior
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="flex items-center px-4 py-2 bg-dinave-600 hover:bg-dinave-700 text-gray-900 font-semibold rounded-lg transition-colors"
            >
              Seguinte
              <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          ) : (
            <button
              onClick={generateXML}
              className="flex items-center px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
            >
              <FileCode className="w-5 h-5 mr-2" />
              Gerar XML Final
            </button>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 mt-8">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <p className="text-center text-sm text-gray-500">
            STADA-Importação CAU XML Generator - Compatível com o portal da Autoridade Tributária
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
