export class AnswersModel {
    Discipline: number;
    MotivoConsulta: string;
    Sistema: SistemaModel;
    Antecendentes: AntecendentesModel;
    Actividades: ActividadesModel;
    Analisisestetico: AnalisisEsteticoModel;
    Obesidad: ObesidadModel;
    Adiposidades: AdiposidadesModel;
    Celulitis: CelulitisModel;
    Estrias: EstriasModel;
    Venas: VenasModel;
    Senos: SenosModel;
    Flacidez: FlacidezModel;

    constructor() {
        this.Discipline = 0;
        this.MotivoConsulta = '';
        this.Sistema = new SistemaModel();
        this.Antecendentes = new AntecendentesModel();
        this.Actividades = new ActividadesModel();
        this.Analisisestetico = new AnalisisEsteticoModel();
        this.Obesidad = new ObesidadModel();
        this.Adiposidades = new AdiposidadesModel();
        this.Celulitis = new CelulitisModel();
        this.Estrias = new EstriasModel();
        this.Venas = new VenasModel();
        this.Senos = new SenosModel();
        this.Flacidez = new FlacidezModel();
    }
}

export class SistemaModel {
    Digestivo: DigestivoModel;
    Respiratorio: RespiratorioModel;
    Renal: RenalModel;
    Endocrino: EndocrinoModel;
    Circulatorio: CirculatorioModel;
    Nervioso: NerviosoModel;
    Muscular: MuscularModel;
    Ginecologico: GinecologicoModel;

    constructor() {
        this.Digestivo = new DigestivoModel();
        this.Respiratorio = new RespiratorioModel();
        this.Renal = new RenalModel();
        this.Endocrino = new EndocrinoModel();
        this.Circulatorio = new CirculatorioModel();
        this.Nervioso = new NerviosoModel();
        this.Muscular = new MuscularModel();
        this.Ginecologico = new GinecologicoModel();
    }
}

/// Sistema
export class DigestivoModel {
    Hemorroides: boolean;
    Estrenimiento: boolean;
    CuantosDias: string;
    Gastritis: boolean;
    Ulceras: boolean;
    Flatulencia: boolean;
    Acidez: boolean;
    ComeRapido: boolean;
    Observaciones: string;

    constructor() {
        this.Hemorroides = false;
        this.Estrenimiento = false;
        this.CuantosDias = '';
        this.Gastritis = false;
        this.Ulceras = false;
        this.Flatulencia = false;
        this.Acidez = false;
        this.ComeRapido = false;
        this.Observaciones = '';
    }
}

export class RespiratorioModel {
    Rinitis: boolean;
    Alergias: boolean;
    Que: string;
    Sinusitis: boolean;
    ProblemasGarganta: boolean;
    Fuma: boolean;
    Cuantos: string;
    ProblemasPulmonares: boolean;
    SensibleGripaRefriados: boolean;
    Asma: boolean;
    TosFrecuente: boolean;
    Tratamiento: string;
    Observaciones: string;

    constructor() {
        this.Rinitis = false;
        this.Alergias = false;
        this.Que = '';
        this.Sinusitis = false;
        this.ProblemasGarganta = false;
        this.Fuma = false;
        this.Cuantos = '';
        this.ProblemasPulmonares = false;
        this.SensibleGripaRefriados = false;
        this.Asma = false;
        this.TosFrecuente = false;
        this.Tratamiento = '';
        this.Observaciones = '';
    }
}

export class RenalModel {
    InfeccionRenal: boolean;
    Cistitis: boolean;
    RetencionLiquidos: boolean;
    CuantasVecesOrinaDia: number;
    TomaAgua: boolean;
    CuantosVasos: number;
    Incontinencia: boolean;
    CalculosRenales: boolean;
    Tratamiento: string;
    Observaciones: string;

    constructor() {
        this.InfeccionRenal = false;
        this.Cistitis = false;
        this.RetencionLiquidos = false;
        this.CuantasVecesOrinaDia = 0;
        this.TomaAgua = false;
        this.CuantosVasos = 0;
        this.Incontinencia = false;
        this.CalculosRenales = false;
        this.Tratamiento = '';
        this.Observaciones = '';
    }
}

export class EndocrinoModel {
    SufreTiroides: boolean;
    T3: string;
    T4: string;
    TSH: string;
    Hipoglicemia: boolean;
    Diabetes: boolean;
    Pancreas: boolean;
    Suprarenales: boolean;
    Cortisona: boolean;
    Dislipidemias: boolean;
    Corticoides: boolean;
    Glicemia: string;
    PerfilLipidico: string;
    Observaciones: string;

    constructor() {
        this.SufreTiroides = false;
        this.T3 = '';
        this.T4 = '';
        this.TSH = '';
        this.Hipoglicemia = false;
        this.Diabetes = false;
        this.Pancreas = false;
        this.Suprarenales = false;
        this.Cortisona = false;
        this.Dislipidemias = false;
        this.Corticoides = false;
        this.Glicemia = '';
        this.PerfilLipidico = '';
        this.Observaciones = '';
    }
}

export class CirculatorioModel {
    Varices: boolean;
    Flebitis: boolean;
    Edema: boolean;
    FlagilidadCapilar: boolean;
    HematomasFaciles: boolean;
    Hipertension: boolean;
    Hipotension: boolean;
    TensionArterial: boolean;
    Taquicardia: boolean;
    Fatiga: boolean;
    ProblemaCardiaco: boolean;
    Teleangiectasias: boolean;
    Arritmia: boolean;
    Arteriosclerosis: boolean;
    PiernasCansadas: boolean;
    ColorMiembrosInferiores: string;
    Dolor: boolean;
    Adormecimiento: boolean;
    Observaciones: string;

    constructor() {
        this.Varices = false;
        this.Flebitis = false;
        this.Edema = false;
        this.FlagilidadCapilar = false;
        this.HematomasFaciles = false;
        this.Hipertension = false;
        this.Hipotension = false;
        this.TensionArterial = false;
        this.Taquicardia = false;
        this.Fatiga = false;
        this.ProblemaCardiaco = false;
        this.Teleangiectasias = false;
        this.Arritmia = false;
        this.Arteriosclerosis = false;
        this.PiernasCansadas = false;
        this.ColorMiembrosInferiores = '';
        this.Dolor = false;
        this.Adormecimiento = false;
        this.Observaciones = '';
    }
}

export class NerviosoModel {
    Stress: boolean;
    Depresiones: boolean;
    Ansiedad: boolean;
    RelacionConComida: boolean;
    CuantasHorasDuerme: number;
    EscalaAnsiedad: number;
    Cefaleas: boolean;
    Epilepsia: boolean;
    Antidepresivos: boolean;
    Cuales: string;
    EnfermedadesMentales: boolean;
    QueFamiliar: string;
    Observaciones: string;

    constructor() {
        this.Stress = false;
        this.Depresiones = false;
        this.Ansiedad = false;
        this.RelacionConComida = false;
        this.CuantasHorasDuerme = 0;
        this.EscalaAnsiedad = 0;
        this.Cefaleas = false;
        this.Epilepsia = false;
        this.Antidepresivos = false;
        this.Cuales = '';
        this.EnfermedadesMentales = false;
        this.QueFamiliar = '';
        this.Observaciones = '';
    }
}

export class MuscularModel {
    Artritis: boolean;
    Artrosis: boolean;
    Osteoporosis: boolean;
    ArtrofiasMusculares: boolean;
    Hiperlordosis: boolean;
    Heridas: boolean;
    Calambres: boolean;
    DesviacionColumna: boolean;
    PiePlano: boolean;
    EspasmosMusculares: boolean;
    Tratamiento: string;
    Observaciones: string;

    constructor() {
        this.Artritis = false;
        this.Artrosis = false;
        this.Osteoporosis = false;
        this.ArtrofiasMusculares = false;
        this.Hiperlordosis = false;
        this.Heridas = false;
        this.Calambres = false;
        this.DesviacionColumna = false;
        this.PiePlano = false;
        this.EspasmosMusculares = false;
        this.Tratamiento = '';
        this.Observaciones = '';
    }
}
/// Sistema

export class AntecendentesModel {
    Quirurgicos: QuirurgicosModel;
    Alergicos: AlergicosModel;
    Familiares: FamiliaresModel;

    constructor() {
        this.Quirurgicos = new QuirurgicosModel();
        this.Alergicos = new AlergicosModel();
        this.Familiares = new FamiliaresModel();
        
    }
}

/// Antecedentes
export class QuirurgicosModel {
    TieneCirugias: boolean;
    CualCirugia: string;
    PadecidoEnfermedad: boolean;
    CualEnfermedad: string;
    ConsumeMedicamentoVitamina: boolean;
    CualMedicamentoVitamina: string;
    Observaciones: string;

    constructor() {
        this.TieneCirugias = false;
        this.CualCirugia = '';
        this.PadecidoEnfermedad = false;
        this.CualEnfermedad = '';
        this.ConsumeMedicamentoVitamina = false;
        this.CualMedicamentoVitamina = '';
        this.Observaciones = '';
    }
}

export class AlergicosModel {
    Yodo: boolean;
    Alcachofa: boolean;
    AnestesicosLocales: boolean;
    MediosContrastes: boolean;
    Otros: string;
    Observaciones: string;

    constructor() {
        this.Yodo = false;
        this.Alcachofa = false;
        this.AnestesicosLocales = false;
        this.MediosContrastes = false;
        this.Otros = '';
        this.Observaciones = '';
    }
}

export class FamiliaresModel {
    Obesidad: boolean;
    Sobrepeso: boolean;
    Celulitis: boolean;
    Flacidez: boolean;
    Estrias: boolean;
    Observaciones: string;

    constructor() {
        this.Obesidad = false;
        this.Sobrepeso = false;
        this.Celulitis = false;
        this.Flacidez = false;
        this.Estrias = false;
        this.Observaciones = '';
    }
}
/// Antecedentes

export class ActividadesModel {
    PracticaDeporte: boolean;
    Cual: string;
    Frecuencia: string;
    CuantoTiempo: string;
    EsSedentario: boolean;
    Observaciones: string;

    constructor() {
        this.PracticaDeporte = false;
        this.Cual = '';
        this.Frecuencia = '';
        this.CuantoTiempo = '';
        this.EsSedentario = false;
        this.Observaciones = '';
    }
}

export class AnalisisEsteticoModel {
    Picnico: boolean;
    Longilineo: boolean;
    Normolineo: boolean;
    TallaInicial: number;
    PesoActual: number;
    PesoIdeal: number;
    PesoRecomendado: number;
    PesoDeseado: number;
    Estatura: number;
    Biotipo: number;
    TallaFinalTratamiento: number;
    PesoFinal: number;
    Observaciones: string;

    constructor() {
       this.Picnico = false;
       this.Longilineo = false;
       this.Normolineo = false;
       this.TallaInicial = 0;
       this.PesoActual = 0;
       this.PesoIdeal = 0;
       this.PesoRecomendado = 0;
       this.PesoDeseado = 0;
       this.Estatura = 0;
       this.Biotipo = 0;
       this.TallaFinalTratamiento = 0;
       this.PesoFinal = 0;
       this.Observaciones = '';
    }
}

export class ObesidadModel {
    Generalizada: boolean;
    Localizada: boolean;
    Ginoide: boolean;
    Androide: boolean;
    Observaciones: string;

    constructor() {
        this.Generalizada = false;
        this.Localizada = false;
        this.Ginoide = false;
        this.Androide = false;
        this.Observaciones = '';
    }
}

export class AdiposidadesModel {
    Abdomen: boolean;
    Caderas: boolean;
    Otros: string;
    Observaciones: string;

    constructor() {
        this.Abdomen = false;
        this.Caderas = false;
        this.Otros = '';
        this.Observaciones = '';
    }
}

export class CelulitisModel {
    Estadio: boolean;
    I: boolean;
    II: boolean;
    III: boolean;
    IV: boolean;
    Nodulos: boolean;
    Dolor: boolean;
    Movilidad: boolean;
    Dura: boolean;
    Flacida: boolean;
    Esponjosa: boolean;
    Edematosa: boolean;
    Difusa: boolean;
    PielDeNaranja: boolean;
    CambioTemperatura: boolean;
    Color: string;
    Pezantes: boolean;
    Observaciones: string;

    constructor() {
        this.Estadio = false;
        this.I = false;
        this.II = false;
        this.III = false;
        this.IV = false;
        this.Nodulos = false;
        this.Dolor = false;
        this.Movilidad = false;
        this.Dura = false;
        this.Flacida = false;
        this.Esponjosa = false;
        this.Edematosa = false;
        this.Difusa = false;
        this.PielDeNaranja = false;
        this.CambioTemperatura = false;
        this.Color = '';
        this.Pezantes = false;
        this.Observaciones = '';
    }
}

export class EstriasModel {
    Estado: boolean;
    Recientes: boolean;
    Antiguas: boolean;
    Observaciones: string;

    constructor() {
        this.Estado = false;
        this.Recientes = false;
        this.Antiguas = false;
        this.Observaciones = '';
     }
}

export class VenasModel {
    Varices: boolean;
    I: boolean;
    II: boolean;
    III: boolean;
    IV: boolean;
    Observaciones: string;

    constructor() {
        this.Varices = false;
        this.I = false;
        this.II = false;
        this.III = false;
        this.IV = false;
        this.Observaciones = '';
     }
}

export class SenosModel {
    Normales: boolean;
    Hipertroficos: boolean;
    Hipotroficos: boolean;
    PtosisMamaria: boolean;
    Protesis: boolean;
    Estrias: boolean;
    Observaciones: string;

    constructor() {
        this.Normales = false;
        this.Hipertroficos = false;
        this.Hipotroficos = false;
        this.PtosisMamaria = false;
        this.Protesis = false;
        this.Estrias = false;
        this.Observaciones = '';
    }
}

export class GinecologicoModel {
    Menarca: boolean;
    Menopausia: boolean;
    IrregularidadMestrual: boolean;
    NormalidadMestrual: boolean;
    CicloMestrual: number;
    Fum: boolean;
    Embarazo: boolean;
    Cuantos: number;
    Fup: boolean;
    TipoAborto: string;
    Anticonceptivo: boolean;
    TiempoUso: string;
    Dismenorrea: boolean;
    Miomas: boolean;
    QuisteOvarico: boolean;
    ConsumoHormona: boolean;
    Razon: string;
    InfeccionVaginal: boolean;
    Flujo: boolean;
    Observaciones: string

    constructor() {
        this.Menarca = false;
        this.Menopausia = false;
        this.IrregularidadMestrual = false;
        this.NormalidadMestrual = false;
        this.CicloMestrual = 0;
        this.Fum = false;
        this.Embarazo = false;
        this.Cuantos = 0;
        this.Fup = false;
        this.TipoAborto = "";
        this.Anticonceptivo = false;
        this.TiempoUso = "";
        this.Dismenorrea = false;
        this.Miomas = false;
        this.QuisteOvarico = false;
        this.ConsumoHormona = false;
        this.Razon = "";
        this.InfeccionVaginal = false;
        this.Flujo = false;
        this.Observaciones = "";   
    }
}

export class FlacidezModel {
    Estado: boolean;
    Observaciones: string;

    constructor() {
        this.Estado = false;
        this.Observaciones = '';
    }
}