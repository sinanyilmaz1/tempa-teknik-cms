// Run with: npm run seed:history
// Idempotent per locale: the tr entry is matched by `year`, translations are matched by
// documentId + locale — safe to re-run after adding new entries or new translations.
const { compileStrapi, createStrapi } = require('@strapi/strapi');

const UID = 'api::company-history.company-history';
const TRANSLATED_LOCALES = ['en', 'es', 'it', 'fr'];

const entries = [
  {
    year: 1996,
    icon: 'flag',
    description_tr: `Yerel satış ve teknik servis sağlayıcısı olarak kurulmuştur.`,
    description_en: `Founded as a local sales and technical service provider.`,
    description_es: `Fundada como proveedor local de ventas y servicio técnico.`,
    description_it: `Fondata come fornitore locale di vendite e servizio tecnico.`,
    description_fr: `Fondée en tant que fournisseur local de vente et de service technique.`,
  },
  {
    year: 2000,
    icon: 'location',
    description_tr: `İkinci şube açıldı ve merkez Çorlu'ya taşındı.`,
    description_en: `A second branch was opened and the headquarters moved to Çorlu.`,
    description_es: `Se abrió una segunda sucursal y la sede se trasladó a Çorlu.`,
    description_it: `È stata aperta una seconda filiale e la sede è stata trasferita a Çorlu.`,
    description_fr: `Une deuxième succursale a été ouverte et le siège a été transféré à Çorlu.`,
  },
  {
    year: 2004,
    icon: 'gears',
    description_tr: `Otomasyon çözümleri ve sektörel makine geliştirilmeye başlandı.`,
    description_en: `Began developing automation solutions and industry-specific machinery.`,
    description_es: `Se comenzó a desarrollar soluciones de automatización y maquinaria específica del sector.`,
    description_it: `Iniziato lo sviluppo di soluzioni di automazione e macchinari specifici per il settore.`,
    description_fr: `Début du développement de solutions d'automatisation et de machines spécifiques au secteur.`,
  },
  {
    year: 2006,
    icon: 'handshake',
    description_tr: `İlk distribütörlük anlaşması ile Türkiye'ye il kez yem karma tartım seti tanıtıldı.`,
    description_en: `With the first distributorship agreement, the feed mixing weighing system was introduced in Turkey for the first time.`,
    description_es: `Con el primer acuerdo de distribución, el sistema de pesaje y mezcla de piensos se introdujo por primera vez en Turquía.`,
    description_it: `Con il primo accordo di distribuzione, il sistema di pesatura e miscelazione dei mangimi è stato introdotto per la prima volta in Turchia.`,
    description_fr: `Avec le premier accord de distribution, le système de pesage et de mélange d'aliments pour animaux a été introduit pour la première fois en Turquie.`,
  },
  {
    year: 2010,
    icon: 'chip',
    description_tr: `Elektronik Arge kuruldu; donanım ve gömülü yazılım alanında çalışmalara başlandı.`,
    description_en: `Electronics R&D was established; work began in hardware and embedded software.`,
    description_es: `Se estableció el departamento de I+D electrónica; se iniciaron los trabajos en hardware y software embebido.`,
    description_it: `È stato istituito il reparto R&S elettronica; sono iniziati i lavori su hardware e software embedded.`,
    description_fr: `Le département R&D électronique a été créé ; les travaux ont commencé dans le matériel et les logiciels embarqués.`,
  },
  {
    year: 2013,
    icon: 'box',
    description_tr: `Yeni distribütörlükler, hayvancılık sektörüne nokta çözümler tanıtıldı; Kompozit Hammadde Silosu`,
    description_en: `New distributorships; point solutions introduced to the livestock sector; Composite Raw Material Silo.`,
    description_es: `Nuevas distribuciones; se introdujeron soluciones puntuales para el sector ganadero; Silo de Materia Prima Compuesta.`,
    description_it: `Nuove distribuzioni; introdotte soluzioni puntuali per il settore zootecnico; Silo per Materie Prime Composite.`,
    description_fr: `Nouvelles distributions ; des solutions ponctuelles ont été introduites pour le secteur de l'élevage ; Silo de Matières Premières Composites.`,
  },
  {
    year: 2016,
    icon: 'robot',
    description_tr: `İlk Süt Sağım Robotu Yem Besleme sistemi devreye alındı.`,
    description_en: `The first Milking Robot Feed Delivery system was commissioned.`,
    description_es: `Se puso en marcha el primer sistema de alimentación para Robot de Ordeño.`,
    description_it: `È stato messo in funzione il primo sistema di alimentazione per Robot di Mungitura.`,
    description_fr: `Le premier système d'alimentation pour Robot de Traite a été mis en service.`,
  },
  {
    year: 2017,
    icon: 'factory',
    description_tr: `Üretim nitelik ve kabiliyetlerimizi artırmak üzere yeni fabrikaya geçildi.\n\nElektronik alanındaki ilk ihracatı elektronik kart ve cihaz olarak gerçekleştirildi.`,
    description_en: `Moved to a new factory to increase our production quality and capabilities.\n\nOur first export in electronics was carried out in the form of electronic boards and devices.`,
    description_es: `Nos trasladamos a una nueva fábrica para aumentar nuestra calidad y capacidad de producción.\n\nNuestra primera exportación en electrónica se realizó en forma de placas y dispositivos electrónicos.`,
    description_it: `Trasferimento in un nuovo stabilimento per aumentare la qualità e le capacità produttive.\n\nLa prima esportazione nel settore elettronico è stata realizzata sotto forma di schede e dispositivi elettronici.`,
    description_fr: `Déménagement dans une nouvelle usine afin d'accroître notre qualité et nos capacités de production.\n\nNotre première exportation dans le domaine de l'électronique a été réalisée sous forme de cartes et d'appareils électroniques.`,
  },
  {
    year: 2021,
    icon: 'cloud',
    description_tr: `Arge ile; ilk IoT cihaz ve bulut tabanlı yazılım alanında çalışmalara başlandı.\n\nFabrikada; lazer boru & sac kesim makinesi yatırımı ile üretim kabiliyetlerimiz geliştirildi.`,
    description_en: `With R&D, work began on our first IoT device and cloud-based software.\n\nAt the factory, our production capabilities were enhanced with an investment in a laser pipe & sheet metal cutting machine.`,
    description_es: `Con I+D, comenzamos a trabajar en nuestro primer dispositivo IoT y software basado en la nube.\n\nEn la fábrica, nuestras capacidades de producción se mejoraron con la inversión en una máquina de corte láser de tubos y chapa.`,
    description_it: `Con la R&S, sono iniziati i lavori sul nostro primo dispositivo IoT e sul software basato su cloud.\n\nIn fabbrica, le nostre capacità produttive sono state potenziate con l'investimento in una macchina da taglio laser per tubi e lamiere.`,
    description_fr: `Avec la R&D, les travaux ont commencé sur notre premier appareil IoT et notre logiciel basé sur le cloud.\n\nÀ l'usine, nos capacités de production ont été renforcées grâce à l'investissement dans une machine de découpe laser pour tubes et tôles.`,
  },
  {
    year: 2022,
    icon: 'flask',
    description_tr: `İlk otomatik Kesif Yem Tesisimiz kuruldu.\n\nMillileştirme hamlesi ile bulut tabanlı Yem Yönetim Sistemi TÜBİTAK projesi kapsamında gerçekleştirildi.`,
    description_en: `Our first automatic Concentrated Feed Facility was established.\n\nAs part of a localization initiative, a cloud-based Feed Management System was developed under a TÜBİTAK project.`,
    description_es: `Se estableció nuestra primera Planta de Piensos Concentrados automática.\n\nComo parte de una iniciativa de nacionalización, se desarrolló un Sistema de Gestión de Piensos basado en la nube en el marco de un proyecto de TÜBİTAK.`,
    description_it: `È stato istituito il nostro primo impianto automatico per Mangimi Concentrati.\n\nNell'ambito di un'iniziativa di localizzazione, è stato sviluppato un Sistema di Gestione dei Mangimi basato su cloud nell'ambito di un progetto TÜBİTAK.`,
    description_fr: `Notre premier site automatique d'Aliments Concentrés a été créé.\n\nDans le cadre d'une initiative de localisation, un Système de Gestion des Aliments basé sur le cloud a été développé dans le cadre d'un projet TÜBİTAK.`,
  },
  {
    year: 2023,
    icon: 'building',
    description_tr: `Gelişen Arge'mizi desteklemek üzere Arge ofisimiz taşındı.\n\nTÜBİTAK TEYDEB Kapsamında otonom yem itme robotu projesi başlandı.`,
    description_en: `Our R&D office relocated to support our growing R&D activities.\n\nAn autonomous feed-pushing robot project was launched under TÜBİTAK TEYDEB.`,
    description_es: `Nuestra oficina de I+D se trasladó para apoyar el crecimiento de nuestras actividades de I+D.\n\nSe lanzó un proyecto de robot autónomo para empujar el alimento en el marco de TÜBİTAK TEYDEB.`,
    description_it: `Il nostro ufficio R&S si è trasferito per supportare la crescita delle nostre attività di R&S.\n\nÈ stato avviato un progetto di robot autonomo per la spinta del mangime nell'ambito di TÜBİTAK TEYDEB.`,
    description_fr: `Notre bureau R&D a déménagé pour soutenir la croissance de nos activités de R&D.\n\nUn projet de robot autonome de poussée d'aliments a été lancé dans le cadre de TÜBİTAK TEYDEB.`,
  },
  {
    year: 2024,
    icon: 'network',
    description_tr: `İlk Otonom Yem Merkezi projesi gerçekleştirildi.\n\nYurtdışı partner firmalar için mekanik konstrüksiyon tedariği başlandı.`,
    description_en: `Our first Autonomous Feed Center project was completed.\n\nWe began supplying mechanical construction for international partner companies.`,
    description_es: `Se completó nuestro primer proyecto de Centro de Alimentación Autónomo.\n\nComenzamos a suministrar construcción mecánica para empresas socias internacionales.`,
    description_it: `È stato completato il nostro primo progetto di Centro Mangimi Autonomo.\n\nAbbiamo iniziato a fornire costruzioni meccaniche per aziende partner internazionali.`,
    description_fr: `Notre premier projet de Centre d'Alimentation Autonome a été achevé.\n\nNous avons commencé à fournir des constructions mécaniques pour des entreprises partenaires internationales.`,
  },
];

async function seed() {
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  for (const entry of entries) {
    let trDoc = (
      await app.documents(UID).findMany({
        filters: { year: entry.year },
        locale: 'tr',
      })
    )[0];

    if (!trDoc) {
      trDoc = await app.documents(UID).create({
        data: {
          year: entry.year,
          icon: entry.icon,
          is_active: true,
          description: entry.description_tr,
        },
        locale: 'tr',
        status: 'published',
      });
      app.log.info(`Seeded tr ${entry.year}`);
    } else {
      app.log.info(`Skipping tr ${entry.year} (already exists)`);
    }

    for (const locale of TRANSLATED_LOCALES) {
      const description = entry[`description_${locale}`];
      if (!description) continue;

      const localeVersion = await app.documents(UID).findOne({
        documentId: trDoc.documentId,
        locale,
      });

      if (localeVersion) {
        app.log.info(`Skipping ${locale} ${entry.year} (already exists)`);
        continue;
      }

      await app.documents(UID).update({
        documentId: trDoc.documentId,
        locale,
        data: { description },
      });
      await app.documents(UID).publish({
        documentId: trDoc.documentId,
        locale,
      });
      app.log.info(`Seeded ${locale} ${entry.year}`);
    }
  }

  await app.destroy();
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
