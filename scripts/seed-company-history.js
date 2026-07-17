// Run with: npm run seed:history
// Idempotent: entries are matched by `year` (tr locale) and skipped if they already exist.
const { compileStrapi, createStrapi } = require('@strapi/strapi');

const UID = 'api::company-history.company-history';

const entries = [
  {
    year: 1996,
    icon: 'flag',
    description: `Yerel satış ve teknik servis sağlayıcısı olarak kurulmuştur.`,
  },
  {
    year: 2000,
    icon: 'location',
    description: `İkinci şube açıldı ve merkez Çorlu'ya taşındı.`,
  },
  {
    year: 2004,
    icon: 'gears',
    description: `Otomasyon çözümleri ve sektörel makine geliştirilmeye başlandı.`,
  },
  {
    year: 2006,
    icon: 'handshake',
    description: `İlk distribütörlük anlaşması ile Türkiye'ye il kez yem karma tartım seti tanıtıldı.`,
  },
  {
    year: 2010,
    icon: 'chip',
    description: `Elektronik Arge kuruldu; donanım ve gömülü yazılım alanında çalışmalara başlandı.`,
  },
  {
    year: 2013,
    icon: 'box',
    description: `Yeni distribütörlükler, hayvancılık sektörüne nokta çözümler tanıtıldı; Kompozit Hammadde Silosu`,
  },
  {
    year: 2016,
    icon: 'robot',
    description: `İlk Süt Sağım Robotu Yem Besleme sistemi devreye alındı.`,
  },
  {
    year: 2017,
    icon: 'factory',
    description: `Üretim nitelik ve kabiliyetlerimizi artırmak üzere yeni fabrikaya geçildi.\n\nElektronik alanındaki ilk ihracatı elektronik kart ve cihaz olarak gerçekleştirildi.`,
  },
  {
    year: 2021,
    icon: 'cloud',
    description: `Arge ile; ilk IoT cihaz ve bulut tabanlı yazılım alanında çalışmalara başlandı.\n\nFabrikada; lazer boru & sac kesim makinesi yatırımı ile üretim kabiliyetlerimiz geliştirildi.`,
  },
  {
    year: 2022,
    icon: 'flask',
    description: `İlk otomatik Kesif Yem Tesisimiz kuruldu.\n\nMillileştirme hamlesi ile bulut tabanlı Yem Yönetim Sistemi TÜBİTAK projesi kapsamında gerçekleştirildi.`,
  },
  {
    year: 2023,
    icon: 'building',
    description: `Gelişen Arge'mizi desteklemek üzere Arge ofisimiz taşındı.\n\nTÜBİTAK TEYDEB Kapsamında otonom yem itme robotu projesi başlandı.`,
  },
  {
    year: 2024,
    icon: 'network',
    description: `İlk Otonom Yem Merkezi projesi gerçekleştirildi.\n\nYurtdışı partner firmalar için mekanik konstrüksiyon tedariği başlandı.`,
  },
];

async function seed() {
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  for (const entry of entries) {
    const existing = await app.documents(UID).findMany({
      filters: { year: entry.year },
      locale: 'tr',
    });

    if (existing.length > 0) {
      app.log.info(`Skipping ${entry.year} (already exists)`);
      continue;
    }

    await app.documents(UID).create({
      data: {
        year: entry.year,
        icon: entry.icon,
        is_active: true,
        description: entry.description,
      },
      locale: 'tr',
      status: 'published',
    });

    app.log.info(`Seeded ${entry.year}`);
  }

  await app.destroy();
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
