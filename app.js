const root = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const navButtons = [...document.querySelectorAll('[data-screen-target]')];
    const screens = [...document.querySelectorAll('.screen')];
    const screenTitle = document.getElementById('screenTitle');
    const processBirthBtn = document.getElementById('processBirthBtn');
    const previewBirthBtn = document.getElementById('previewBirthBtn');
    const registerForm = document.getElementById('registerForm');
    const togglePasswordBtn = document.getElementById('togglePasswordBtn');
    const loginForm = document.getElementById('loginForm');
    const toggleLoginPasswordBtn = document.getElementById('toggleLoginPasswordBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const headerLogoutBtn = document.getElementById('headerLogoutBtn');
    const profileForm = document.getElementById('profileForm');
    const removeAvatarBtn = document.getElementById('removeAvatarBtn');
    const BODY_REGISTRY = [
      { code: 'Sun', command: '10' },
      { code: 'Moon', command: '301' },
      { code: 'Mercury', command: '199' },
      { code: 'Venus', command: '299' },
      { code: 'Mars', command: '499' },
      { code: 'Jupiter', command: '599' },
      { code: 'Saturn', command: '699' },
      { code: 'Uranus', command: '799' },
      { code: 'Neptune', command: '899' },
      { code: 'Pluto', command: '999' }
    ];

    themeToggle.addEventListener('click', () => {
      root.setAttribute('data-theme', root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });

    renderDailyHoroscopes();
    renderWeeklyHoroscopes();
    renderMonthlyHoroscopes();

    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.screenTarget;
        navButtons.forEach(x => x.classList.remove('active'));
        btn.classList.add('active');
        screens.forEach(screen => screen.classList.toggle('active', screen.id === target));
        screenTitle.textContent = btn.textContent.trim();
      });
    });

    const getBirthPayload = () => ({
      name: document.getElementById('birthName').value.trim(),
      zodiac: document.getElementById('birthZodiac').value,
      date: document.getElementById('birthDate').value,
      time: document.getElementById('birthTime').value,
      city: document.getElementById('birthCity').value.trim(),
      country: document.getElementById('birthCountry').value.trim(),
      timezone: document.getElementById('birthTimezone').value,
      houseSystem: document.getElementById('birthHouse').value
    });

    const zodiacSigns = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    const dailyThemes = {
      Aries: { focus: 'başlangıç', love: 'Duyguları açık söylemek ilişkiyi hızlandırabilir.', work: 'Öne çıkmak ve karar almak için uygun bir gün.', wellness: 'Yüksek tempo yüzünden kısa molalar önemli.' },
      Taurus: { focus: 'istikrar', love: 'Yakınlık ve güven arayışı daha belirgin olabilir.', work: 'Sabırlı ilerlemek kalıcı sonuç verebilir.', wellness: 'Rutinler bedeni ve zihni dengeleyebilir.' },
      Gemini: { focus: 'iletişim', love: 'Mesajlar ve konuşmalar ilişki tonunu belirleyebilir.', work: 'Toplantı, yazışma ve fikir paylaşımı öne çıkabilir.', wellness: 'Zihinsel dağınıklığı azaltmak için ekran arası iyi gelir.' },
      Cancer: { focus: 'duygusal güven', love: 'Ev ve aidiyet temaları ilişkilerde hassas olabilir.', work: 'İçgüdülerin doğru insanı doğru projeye yöneltebilir.', wellness: 'Dinlenme ve duygusal sınırlar bugün değerli.' },
      Leo: { focus: 'görünürlük', love: 'İlgi görmek ve vermek arasında denge kurmak faydalı olur.', work: 'Yaratıcı bir fikir dikkat çekebilir.', wellness: 'Enerjiyi sahneye koyarken bedeni zorlamamaya dikkat et.' },
      Virgo: { focus: 'düzen', love: 'Küçük ama düşünceli jestler daha etkili olabilir.', work: 'Detayları toparlamak seni öne çıkarabilir.', wellness: 'Beslenme ve günlük akışta sadeleşme iyi gelir.' },
      Libra: { focus: 'denge', love: 'Karşı tarafı dinlemek ilişki iklimini yumuşatabilir.', work: 'Ortaklıklar ve müzakere isteyen işler destekli.', wellness: 'Sosyal tempo ile kişisel alan arasında ritim kur.' },
      Scorpio: { focus: 'derinlik', love: 'Yoğun duygular açık ama kontrollü ifade ister.', work: 'Araştırma ve strateji gerektiren işler güçlenebilir.', wellness: 'Gerginliği içeride tutmak yerine akıtmak önemli.' },
      Sagittarius: { focus: 'ufuk genişletme', love: 'Daha dürüst ve özgür bir konuşma iyi gelebilir.', work: 'Yeni planlar ve öğrenme alanları açılabilir.', wellness: 'Hareket ve açık hava motivasyonu artırabilir.' },
      Capricorn: { focus: 'hedef', love: 'Duyguları yapılandırmak yakınlığı artırabilir.', work: 'Sorumluluk almak görünür başarı getirebilir.', wellness: 'Dinlenmeyi de yapılacaklar listesine eklemek gerekir.' },
      Aquarius: { focus: 'yenilik', love: 'Farklı bir yaklaşım ilişkiye ferahlık katabilir.', work: 'Yaratıcı çözüm ya da teknoloji teması avantaj sağlayabilir.', wellness: 'Sosyal yoğunluk içinde kişisel boşluk yaratmak iyi olur.' },
      Pisces: { focus: 'akıcılık', love: 'Sezgiler güçlü ama sınırlar net olmalı.', work: 'Yaratıcı işler ve ilham gerektiren alanlar açık.', wellness: 'Uyku, su ve sakinlik bugün daha belirleyici olabilir.' }
    };

    const weeklyThemes = {
      Aries: { focus: 'harekete geçme', love: 'İlişkilerde daha net konuşmalar haftayı belirleyebilir.', career: 'Hızlı karar isteyen işler seni öne taşıyabilir.', wellness: 'Enerjiyi yaymak kadar toparlamak da önemli.' },
      Taurus: { focus: 'temel kurma', love: 'Güven veren tavırlar ilişkilere istikrar katabilir.', career: 'Yavaş ama sağlam ilerleme daha verimli olabilir.', wellness: 'Beden ritmini korumak haftanın ana desteği olur.' },
      Gemini: { focus: 'bağlantı', love: 'Sosyal temaslar ve iletişim kapıları açabilir.', career: 'Birden fazla işi aynı anda yürütme ihtiyacı artabilir.', wellness: 'Zihni sadeleştirmek odaklanmayı güçlendirir.' },
      Cancer: { focus: 'iç denge', love: 'Duygusal ihtiyaçları görünür kılmak ilişkileri rahatlatabilir.', career: 'Sezgisel kararlar bu hafta şaşırtıcı biçimde işe yarayabilir.', wellness: 'Ev, dinlenme ve güven hissi toparlayıcı olur.' },
      Leo: { focus: 'ifade', love: 'Kalpten gelen bir adım ilişkiyi canlandırabilir.', career: 'Görünürlük artışıyla birlikte sorumluluk da yükselebilir.', wellness: 'Performans baskısını keyifle dengelemek gerekir.' },
      Virgo: { focus: 'iyileştirme', love: 'İnce düşünülmüş davranışlar daha çok fark edilebilir.', career: 'Düzen kurmak ve açıkları kapatmak başarı getirir.', wellness: 'Beslenme ve uyku düzeni haftanın ana anahtarıdır.' },
      Libra: { focus: 'ilişki dengesi', love: 'Karşılıklılık ve zarif iletişim ilişkileri güçlendirebilir.', career: 'Ortaklı işler ve arabuluculuk rolü büyüyebilir.', wellness: 'Başkaları için harcanan enerjiyi kendine de yönelt.' },
      Scorpio: { focus: 'derinleşme', love: 'Yüzeyin altındaki konular açığa çıkabilir.', career: 'Stratejik davranmak ve veriyi iyi okumak avantaj sağlar.', wellness: 'Duygusal yoğunluğu sağlıklı kanallara akıtmak gerekir.' },
      Sagittarius: { focus: 'genişleme', love: 'Yeni insanlar veya yeni perspektifler heyecan yaratabilir.', career: 'Eğitim, seyahat ve yayın bağlantılı işler destekli.', wellness: 'Hareket etmek moral ve enerjiyi tazeler.' },
      Capricorn: { focus: 'hedefe bağlanma', love: 'İlişkilerde ciddiyet ve netlik beklentisi artabilir.', career: 'Uzun vadeli planlar için güçlü yapı kurma haftası olabilir.', wellness: 'Disiplin iyidir ama yükü tek başına taşımamaya dikkat et.' },
      Aquarius: { focus: 'yenilikçi yön', love: 'Daha özgün bir ifade biçimi yakınlığı artırabilir.', career: 'Farklı düşünmek ve teknolojiyle ilerlemek kazandırabilir.', wellness: 'Ruhsal ferahlık için yalnız zaman da gerekir.' },
      Pisces: { focus: 'sezgisel akış', love: 'Yumuşak ama net sınırlar ilişkileri korur.', career: 'Yaratıcılık ve sezgi gerektiren işlerde akış açılır.', wellness: 'Su, uyku ve içe dönüş bu hafta özellikle destekleyici olur.' }
    };

    const monthlyThemes = {
      Aries: { focus: 'yeni döngü', love: 'İlişkilerde hız yerine sürdürülebilirlik kurmak ay boyunca daha faydalı olabilir.', career: 'Ayın ilk yarısı girişim, ikinci yarısı düzenleme için daha güçlü olabilir.', wellness: 'Enerjiyi uzun vadeye yaymak bu ay ana derslerden biri.' },
      Taurus: { focus: 'kaynak yönetimi', love: 'Bağlılık, güven ve somut ilgi göstergeleri ön plana çıkabilir.', career: 'Maddi konular ve iş istikrarı ayın ana başlıkları arasında olabilir.', wellness: 'Bedeni destekleyen rutinler belirgin sonuç verebilir.' },
      Gemini: { focus: 'hareket ve seçim', love: 'Aynı anda birçok seçenek açılabilir; netleşmek rahatlatır.', career: 'İletişim, eğitim ve bağlantı kurma üzerinden fırsatlar büyüyebilir.', wellness: 'Zihinsel yükü azaltmak verimi artırır.' },
      Cancer: { focus: 'içsel güvenlik', love: 'Yakın ilişkilerde aidiyet ve şefkat ihtiyacı yükselebilir.', career: 'Perde arkasında yürüyen işler sabır ister ama sonuç verebilir.', wellness: 'Duygusal dengeyi korumak bu ay fiziksel iyi oluşu da destekler.' },
      Leo: { focus: 'sahne ve yön', love: 'Daha görünür, sıcak ve cömert bir ifade ilişkileri besleyebilir.', career: 'Liderlik isteyen alanlarda görünürlük artabilir.', wellness: 'Dinlenme ile performans arasındaki denge bu ay kritik.' },
      Virgo: { focus: 'yeniden yapılandırma', love: 'Netlik, özen ve tutarlılık ilişkilere güven kazandırabilir.', career: 'Plan, takvim ve detay yönetimi seni ileri taşıyabilir.', wellness: 'Sindirim, uyku ve günlük alışkanlıklar hassas başlıklar olabilir.' },
      Libra: { focus: 'ortak alan', love: 'İlişkilerde denge kurma ve uzlaşma arayışı güçlenebilir.', career: 'Ekip işleri, görüşmeler ve estetik hassasiyet gerektiren alanlar destekli.', wellness: 'Sosyal denge kadar yalnız kalma ihtiyacı da önemlidir.' },
      Scorpio: { focus: 'dönüşüm', love: 'Daha derin bir bağlılık ya da güçlü bir yüzleşme teması doğabilir.', career: 'Kontrol, strateji ve kriz yönetimi gerektiren başlıklar öne çıkabilir.', wellness: 'Bastırılan gerginliği dönüştürmek ayın ana şifası olabilir.' },
      Sagittarius: { focus: 'ufuk açma', love: 'Özgürlük alanı ile bağlılık arasında yeni bir denge kurulabilir.', career: 'Yeni öğrenimler, yolculuklar veya yayın temaları ayı büyütebilir.', wellness: 'Açık alan ve hareket, moral gücünü besler.' },
      Capricorn: { focus: 'yapı kurma', love: 'Ciddiyet ve güven arayışı ilişkilerde belirginleşebilir.', career: 'Sorumluluklar artsa da uzun vadeli kazanım potansiyeli yüksek olabilir.', wellness: 'Aşırı yüklenmeye karşı bilinçli dinlenme gerekir.' },
      Aquarius: { focus: 'farklı bakış', love: 'Sıradışı bir yaklaşım ilişkilerde taze hava yaratabilir.', career: 'Teknoloji, ağlar ve kolektif projeler ayı canlandırabilir.', wellness: 'Duygusal mesafeyi azaltırken zihinsel özgürlüğü korumak önemli.' },
      Pisces: { focus: 'sezgisel derinlik', love: 'Romantik ama belirsiz alanlarda net sınırlar kurmak gerekebilir.', career: 'Yaratıcılık ve sezgisel üretim için güçlü bir dönem olabilir.', wellness: 'Su, uyku, yalnızlık ve ruhsal bakım daha belirleyici olabilir.' }
    };

    const signTexts = {
      Aries: { title: 'Aries', summary: 'Girişimci, hızlı ve doğrudan bir enerji taşır.', detail: 'Aries; enerjik, cesur ve zaman zaman dürtüsel bir karakterle ilişkilendirilir. Britannica, Aries için fire ve cardinal niteliklerini, ayrıca energetic, courageous ve impulsive gibi ana temaları öne çıkarır. [web:92]' },
      Taurus: { title: 'Taurus', summary: 'Daha sabit, güven odaklı ve pratik bir yapı vurgular.', detail: 'Taurus; güvenilir, pratik ve bazen inatçı yönlerle tanımlanır. Britannica, bu burcu earth ve fixed olarak sınıflandırır ve reliable, practical, stubborn özelliklerini listeler. [web:92]' },
      Gemini: { title: 'Gemini', summary: 'Meraklı, hızlı düşünen ve iletişim odaklı bir ton verir.', detail: 'Gemini için quick-witted, curious ve değişken bir zihin vurgusu yapılır. Britannica bu burcu air ve mutable olarak tanımlar. [web:92]' },
      Cancer: { title: 'Cancer', summary: 'Koruyucu, duygusal ve aidiyet arayan bir eğilim taşır.', detail: 'Cancer; loyal, protective ve duygusal iniş çıkışlara açık bir burç olarak özetlenir. Britannica, bu burcu water ve cardinal grubunda verir. [web:92]' },
      Leo: { title: 'Leo', summary: 'Yaratıcı, görünür ve kendini ortaya koyan bir ifade getirir.', detail: 'Leo için yaratıcı, cömert ve bazen baskın olabilen bir etki vurgulanır. Britannica, Leo’yu fire ve fixed yapıda sınıflandırır. [web:92]' },
      Virgo: { title: 'Virgo', summary: 'Düzen, analiz ve iyileştirme ihtiyacını yükseltir.', detail: 'Virgo; analytical, hardworking ve zaman zaman critical eğilimlerle ilişkilendirilir. Britannica, Virgo’yu earth ve mutable olarak açıklar. [web:92]' },
      Libra: { title: 'Libra', summary: 'İlişki, denge ve diplomasi temalarını öne çıkarır.', detail: 'Libra için cooperative, diplomatic ve kararsızlığa açık yönler belirtilir. Britannica, Libra’yı air ve cardinal grubunda verir. [web:92]' },
      Scorpio: { title: 'Scorpio', summary: 'Yoğunluk, derin bağ kurma ve güçlü sezgiler taşır.', detail: 'Scorpio; passionate ve resourceful yönlerle öne çıkar, fakat kıskançlık ve yoğunluk da bu burca bağlanır. Britannica bu burcu water ve fixed olarak sınıflandırır. [web:92]' },
      Sagittarius: { title: 'Sagittarius', summary: 'Ufuk genişleten, arayan ve keşfe açık bir enerji verir.', detail: 'Sagittarius için adventurous ve honest temaları baskındır. Britannica bu burcu fire ve mutable nitelikte tanımlar. [web:92]' },
      Capricorn: { title: 'Capricorn', summary: 'Disiplin, sorumluluk ve uzun vadeli hedef duygusu getirir.', detail: 'Capricorn; disciplined, responsible ve hırslı bir eksenle anlatılır. Britannica, Capricorn’u earth ve cardinal olarak listeler. [web:92]' },
      Aquarius: { title: 'Aquarius', summary: 'Bağımsız, yenilikçi ve daha kolektif düşünen bir yön taşır.', detail: 'Aquarius için independent, humanitarian ve yenilik odaklı nitelikler vurgulanır. Zodiacsign ve Deluxe Astrology de Aquarius’u insancıl ve bağımsız bir enerjiyle tanımlar. [web:91][web:105]' },
      Pisces: { title: 'Pisces', summary: 'Sezgisel, empatik ve akışkan bir duygusal alan açar.', detail: 'Pisces çoğunlukla empathetic, artistic ve selfless yönlerle öne çıkar. Deluxe Astrology bu burcu duyarlı ve özverili bir eksenle açıklar. [web:105]' }
    };

    const validateBirthPayload = payload => {
      if (!payload.name) return 'İsim alanı zorunlu.';
      if (!payload.date) return 'Doğum tarihi zorunlu.';
      if (!payload.time) return 'Doğum saati zorunlu.';
      if (!payload.city) return 'Doğum şehri zorunlu.';
      if (!payload.country) return 'Ülke bilgisi zorunlu.';
      const birthDate = new Date(`${payload.date}T${payload.time}`);
      const now = new Date();
      if (Number.isNaN(birthDate.getTime())) return 'Tarih veya saat geçerli değil.';
      if (birthDate > now) return 'Doğum tarihi gelecekte olamaz.';
      return null;
    };

    const toUtcIso = payload => {
      const tzMap = {
        'UTC': 0,
        'Europe/Istanbul': 3,
        'Europe/London': 0,
        'America/New_York': -4
      };
      const offset = tzMap[payload.timezone] ?? 0;
      const local = new Date(`${payload.date}T${payload.time}:00`);
      const utcMs = local.getTime() - offset * 60 * 60 * 1000;
      return new Date(utcMs).toISOString();
    };

    const buildHorizonsUrl = payload => {
      const utcIso = toUtcIso(payload).replace('.000Z', '');
      const base = 'https://ssd.jpl.nasa.gov/api/horizons.api';
      const params = new URLSearchParams({
        format: 'text',
        MAKE_EPHEM: 'YES',
        EPHEM_TYPE: 'OBSERVER',
        CENTER: 'coord@399',
        COORD_TYPE: 'GEODETIC',
        SITE_COORD: '28.9784,41.0082,0.039',
        TLIST: utcIso,
        COMMAND: '10',
        QUANTITIES: '1,20'
      });
      return `${base}?${params.toString()}`;
    };

    const getSignFromDegrees = degrees => zodiacSigns[Math.floor((((degrees % 360) + 360) % 360) / 30)];

    const formatLongitude = degrees => {
      const normalized = ((degrees % 360) + 360) % 360;
      const signIndex = Math.floor(normalized / 30);
      const within = normalized % 30;
      const deg = Math.floor(within);
      const minute = Math.floor((within - deg) * 60);
      return `${String(deg).padStart(2, '0')}° ${zodiacSigns[signIndex]} ${String(minute).padStart(2, '0')}′`;
    };

    const mockEphemeris = payload => {
      const seed = `${payload.date}${payload.time}${payload.name}`.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
      return BODY_REGISTRY.map((body, index) => {
        const base = (seed * (index + 3) * 0.137) % 360;
        const lat = (((seed + index * 17) % 120) - 60) / 10;
        const speed = index === 1 ? 12 + ((seed % 90) / 100) : 0.02 + ((seed + index * 13) % 130) / 100;
        const decl = (((seed + index * 21) % 500) / 10) - 25;
        const house = ((Math.floor(base / 30) + index) % 12) + 1;
        return {
          body: body.code,
          longitude: formatLongitude(base),
          latitude: `${lat.toFixed(2)}°`,
          speed: `${speed.toFixed(2)}°/gün`,
          declination: `${decl.toFixed(2)}°`,
          house: house,
          retrograde: speed < 0.1 ? 'R' : 'D'
        };
      });
    };

    const renderWeeklyHoroscopes = () => {
      const container = document.getElementById('weeklyHoroscopes');
      if (!container) return;
      container.innerHTML = zodiacSigns.map(sign => {
        const data = weeklyThemes[sign];
        return `<div class="item"><strong>${sign}</strong><span class="muted">Haftanın teması: ${data.focus}</span><div class="helper" style="margin-top:8px;">Aşk: ${data.love} Kariyer: ${data.career} İyi oluş: ${data.wellness}</div></div>`;
      }).join('');
    };

    const renderMonthlyHoroscopes = () => {
      const container = document.getElementById('monthlyHoroscopes');
      if (!container) return;
      container.innerHTML = zodiacSigns.map(sign => {
        const data = monthlyThemes[sign];
        return `<div class="item"><strong>${sign}</strong><span class="muted">Ayın teması: ${data.focus}</span><div class="helper" style="margin-top:8px;">Aşk: ${data.love} Kariyer: ${data.career} İyi oluş: ${data.wellness}</div></div>`;
      }).join('');
    };

    const renderDailyHoroscopes = () => {
      const container = document.getElementById('dailyHoroscopes');
      if (!container) return;
      container.innerHTML = zodiacSigns.map(sign => {
        const data = dailyThemes[sign];
        return `<div class="item"><strong>${sign}</strong><span class="muted">Günün odağı: ${data.focus}</span><div class="helper" style="margin-top:8px;">Aşk: ${data.love} Kariyer: ${data.work} İyi oluş: ${data.wellness}</div></div>`;
      }).join('');
    };

    const renderSignInterpretations = rows => {
      const sunRow = rows.find(row => row.body === 'Sun');
      const moonRow = rows.find(row => row.body === 'Moon');
      const risingIndex = ((rows[0].house + 11) % 12);
      const risingSign = zodiacSigns[risingIndex];
      const signBox = sign => signTexts[sign] || { title: sign, summary: 'Yorum hazırlanıyor.', detail: 'Bu burç için içerik henüz eklenmedi.' };
      const sunSign = getSignFromDegrees(parseFloat(sunRow.longitude));
      const moonSign = getSignFromDegrees(parseFloat(moonRow.longitude));
      const sunText = signBox(sunSign);
      const moonText = signBox(moonSign);
      const risingText = signBox(risingSign);
      document.getElementById('signInterpretations').innerHTML = `
        <div class="item"><strong>Sun in ${sunText.title}</strong><span class="muted">${sunText.summary}</span><div class="helper" style="margin-top:8px;">${sunText.detail}</div></div>
        <div class="item"><strong>Moon in ${moonText.title}</strong><span class="muted">${moonText.summary}</span><div class="helper" style="margin-top:8px;">${moonText.detail}</div></div>
        <div class="item"><strong>Rising in ${risingText.title}</strong><span class="muted">Yükselen; ilk izlenim, dışa açılan yaklaşım ve hayata giriş biçimiyle ilişkilendirilir.</span><div class="helper" style="margin-top:8px;">Sun, Moon ve Rising birlikte yorumlandığında; Sun çekirdek kimliği, Moon duygusal ihtiyaçları, Rising ise dışa yansıyan yaklaşımı temsil eder. [web:97]</div></div>`;
    };

    const renderEphemeris = payload => {
      const tableBody = document.getElementById('ephemerisTableBody');
      const rows = mockEphemeris(payload);
      tableBody.innerHTML = rows.map(row => `<tr><td>${row.body}</td><td>${row.longitude}</td><td>${row.longitude.split(' ')[1]} / ${row.house}. ev</td><td>${row.latitude}</td><td>${row.speed}</td><td>${row.declination}</td><td>${row.retrograde}</td></tr>`).join('');
      document.getElementById('ephemerisPanel').style.display = 'block';
      document.getElementById('ephemerisUrl').textContent = buildHorizonsUrl(payload);
      document.getElementById('ephemerisUtc').textContent = toUtcIso(payload);
      renderSignInterpretations(rows);
    };

    const renderBirthResult = payload => {
      const message = document.getElementById('birthMessage');
      const result = document.getElementById('birthResult');
      const iso = `${payload.date}T${payload.time}:00`;
      document.getElementById('resultIso').textContent = iso;
      document.getElementById('resultLocation').textContent = `${payload.city}, ${payload.country} (${payload.timezone})`;
      document.getElementById('resultProfile').textContent = `${payload.zodiac} / ${payload.houseSystem}`;
      document.getElementById('resultStatus').textContent = 'Natal chart için hazır';
      result.style.display = 'grid';
      message.innerHTML = `<div class="success"><strong>Doğum bilgisi işlendi.</strong><div class="helper" style="margin-top:6px;">Veri istemci tarafında doğrulandı ve chart isteği için normalize edildi.</div></div>`;
      renderEphemeris(payload);
    };

    processBirthBtn?.addEventListener('click', () => {
      const payload = getBirthPayload();
      const error = validateBirthPayload(payload);
      const message = document.getElementById('birthMessage');
      if (error) {
        document.getElementById('birthResult').style.display = 'none';
        message.innerHTML = `<div class="alert"><strong>Form hatası:</strong> ${error}</div>`;
        return;
      }
      renderBirthResult(payload);
    });

    const validateRegistration = payload => {
      if (!payload.name || payload.name.length < 3) return 'Ad soyad en az 3 karakter olmalı.';
      if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) return 'Geçerli bir e-posta gir.';
      if (!payload.password || payload.password.length < 8) return 'Şifre en az 8 karakter olmalı.';
      return null;
    };

    const renderAvatar = storedUser => {
      const avatarRoot = document.getElementById('profileAvatar');
      const fallback = (storedUser?.name || 'A').trim().charAt(0).toUpperCase();
      if (storedUser?.avatar) {
        avatarRoot.innerHTML = `<img src="${storedUser.avatar}" alt="avatar" />`;
        return;
      }
      avatarRoot.textContent = fallback || 'A';
    };

    const renderProfile = () => {
      const storedUser = JSON.parse(localStorage.getItem('asteria-user') || 'null');
      const session = JSON.parse(localStorage.getItem('asteria-session') || 'null');
      document.getElementById('profileName').textContent = storedUser?.name || 'Misafir Kullanıcı';
      document.getElementById('profileEmail').textContent = storedUser?.email || 'Giriş yapılmadı';
      document.getElementById('profilePurpose').textContent = storedUser?.purpose || 'Henüz belirtilmedi';
      document.getElementById('profileStatus').textContent = session ? 'Aktif oturum' : 'Pasif';
      document.getElementById('profileEditName').value = storedUser?.name || '';
      document.getElementById('profileEditEmail').value = storedUser?.email || '';
      document.getElementById('profileEditPurpose').value = storedUser?.purpose || 'Kişisel kullanım';
      document.getElementById('profileEditLevel').value = storedUser?.level || 'Başlangıç';
      renderAvatar(storedUser);
    };

    const renderSession = session => {
      const summary = document.getElementById('sessionSummary');
      const headerSession = document.getElementById('headerSession');
      const headerLogout = document.getElementById('headerLogoutBtn');
      if (!session) {
        summary.style.display = 'none';
        headerSession.style.display = 'none';
        headerLogout.style.display = 'none';
        return;
      }
      document.getElementById('sessionName').textContent = session.name;
      document.getElementById('sessionEmail').textContent = session.email;
      document.getElementById('sessionState').textContent = 'Giriş yapıldı';
      document.getElementById('sessionTime').textContent = new Date(session.loggedInAt).toLocaleString('tr-TR');
      document.getElementById('headerUserName').textContent = session.name;
      document.getElementById('headerUserEmail').textContent = session.email;
      summary.style.display = 'grid';
      headerSession.style.display = 'inline-flex';
      headerLogout.style.display = 'inline-flex';
    };

    registerForm?.addEventListener('submit', event => {
      event.preventDefault();
      const payload = {
        name: document.getElementById('regName').value.trim(),
        email: document.getElementById('regEmail').value.trim(),
        password: document.getElementById('regPassword').value,
        purpose: document.getElementById('regPurpose').value
      };
      const error = validateRegistration(payload);
      const message = document.getElementById('registerMessage');
      if (error) {
        document.getElementById('registerSummary').style.display = 'none';
        message.innerHTML = `<div class="alert"><strong>Kayıt hatası:</strong> ${error}</div>`;
        return;
      }
      const storedUser = {
        name: payload.name,
        email: payload.email,
        purpose: payload.purpose,
        level: 'Başlangıç',
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('asteria-user', JSON.stringify(storedUser));
      document.getElementById('summaryName').textContent = storedUser.name;
      document.getElementById('summaryEmail').textContent = storedUser.email;
      document.getElementById('summaryPurpose').textContent = storedUser.purpose;
      document.getElementById('summaryStatus').textContent = 'Kayıt tamamlandı';
      document.getElementById('registerSummary').style.display = 'grid';
      message.innerHTML = `<div class="success"><strong>Hesap oluşturuldu.</strong><div class="helper" style="margin-top:6px;">Bu prototype sürümünde kayıt yerel olarak saklanır ve kullanıcı doğrudan uygulama içine alınır.</div></div>`;
    });

    loginForm?.addEventListener('submit', event => {
      event.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;
      const storedUser = JSON.parse(localStorage.getItem('asteria-user') || 'null');
      const message = document.getElementById('loginMessage');
      if (!storedUser || storedUser.email !== email) {
        document.getElementById('sessionSummary').style.display = 'none';
        message.innerHTML = `<div class="alert"><strong>Giriş başarısız:</strong> E-posta veya şifre hatalı.</div>`;
        return;
      }
      if (!password || password.length < 8) {
        document.getElementById('sessionSummary').style.display = 'none';
        message.innerHTML = `<div class="alert"><strong>Giriş başarısız:</strong> E-posta veya şifre hatalı.</div>`;
        return;
      }
      const session = {
        name: storedUser.name,
        email: storedUser.email,
        loggedInAt: new Date().toISOString()
      };
      localStorage.setItem('asteria-session', JSON.stringify(session));
      renderSession(session);
      message.innerHTML = `<div class="success"><strong>Giriş başarılı.</strong><div class="helper" style="margin-top:6px;">Prototype sürümünde oturum yerel olarak işaretlendi ve kullanıcı durumu görünür hale getirildi.</div></div>`;
    });

    toggleLoginPasswordBtn?.addEventListener('click', () => {
      const input = document.getElementById('loginPassword');
      input.type = input.type === 'password' ? 'text' : 'password';
      toggleLoginPasswordBtn.textContent = input.type === 'password' ? 'Şifreyi göster' : 'Şifreyi gizle';
    });

    logoutBtn?.addEventListener('click', () => {
      localStorage.removeItem('asteria-session');
      renderSession(null);
      document.getElementById('loginMessage').innerHTML = `<div class="success"><strong>Çıkış yapıldı.</strong><div class="helper" style="margin-top:6px;">Yerel oturum kapatıldı.</div></div>`;
    });

    document.getElementById('profileAvatarInput')?.addEventListener('change', event => {
      const file = event.target.files?.[0];
      const message = document.getElementById('profileMessage');
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        message.innerHTML = `<div class=\"alert\"><strong>Avatar yüklenemedi:</strong> Lütfen görsel dosyası seç.</div>`;
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const existingUser = JSON.parse(localStorage.getItem('asteria-user') || 'null');
        if (!existingUser) {
          message.innerHTML = `<div class=\"alert\"><strong>Avatar yüklenemedi:</strong> Önce kullanıcı kaydı oluşturmalısın.</div>`;
          return;
        }
        existingUser.avatar = reader.result;
        localStorage.setItem('asteria-user', JSON.stringify(existingUser));
        renderProfile();
        message.innerHTML = `<div class=\"success\"><strong>Avatar önizlemesi hazır.</strong><div class=\"helper\" style=\"margin-top:6px;\">Görsel yerel olarak kaydedildi ve profil kartına uygulandı.</div></div>`;
      };
      reader.readAsDataURL(file);
    });

    removeAvatarBtn?.addEventListener('click', () => {
      const existingUser = JSON.parse(localStorage.getItem('asteria-user') || 'null');
      const message = document.getElementById('profileMessage');
      if (!existingUser) {
        message.innerHTML = `<div class=\"alert\"><strong>Avatar kaldırılamadı:</strong> Önce kullanıcı kaydı oluşturmalısın.</div>`;
        return;
      }
      delete existingUser.avatar;
      localStorage.setItem('asteria-user', JSON.stringify(existingUser));
      document.getElementById('profileAvatarInput').value = '';
      renderProfile();
      message.innerHTML = `<div class=\"success\"><strong>Avatar kaldırıldı.</strong><div class=\"helper\" style=\"margin-top:6px;\">Profil resmi varsayılan baş harfe döndü.</div></div>`;
    });

    profileForm?.addEventListener('submit', event => {
      event.preventDefault();
      const existingUser = JSON.parse(localStorage.getItem('asteria-user') || 'null');
      const message = document.getElementById('profileMessage');
      if (!existingUser) {
        message.innerHTML = `<div class=\"alert\"><strong>Profil güncellenemedi:</strong> Önce kullanıcı kaydı oluşturmalısın.</div>`;
        return;
      }
      const updatedUser = {
        ...existingUser,
        name: document.getElementById('profileEditName').value.trim(),
        email: document.getElementById('profileEditEmail').value.trim(),
        purpose: document.getElementById('profileEditPurpose').value,
        level: document.getElementById('profileEditLevel').value
      };
      localStorage.setItem('asteria-user', JSON.stringify(updatedUser));
      const activeSession = JSON.parse(localStorage.getItem('asteria-session') || 'null');
      if (activeSession) {
        activeSession.name = updatedUser.name;
        activeSession.email = updatedUser.email;
        localStorage.setItem('asteria-session', JSON.stringify(activeSession));
        renderSession(activeSession);
      }
      renderProfile();
      message.innerHTML = `<div class=\"success\"><strong>Profil güncellendi.</strong><div class=\"helper\" style=\"margin-top:6px;\">Yerel kullanıcı kaydı ve oturum görünümü yenilendi.</div></div>`;
    });

    const existingSession = JSON.parse(localStorage.getItem('asteria-session') || 'null');
    renderSession(existingSession);
    renderProfile();

    togglePasswordBtn?.addEventListener('click', () => {
      const input = document.getElementById('regPassword');
      input.type = input.type === 'password' ? 'text' : 'password';
      togglePasswordBtn.textContent = input.type === 'password' ? 'Şifreyi göster' : 'Şifreyi gizle';
    });

    previewBirthBtn?.addEventListener('click', () => {
      const payload = getBirthPayload();
      const message = document.getElementById('birthMessage');
      message.innerHTML = `<div class="success"><strong>JSON önizleme</strong><pre style="white-space:pre-wrap; margin:10px 0 0; font-size:12px; color:var(--color-text);">${JSON.stringify(payload, null, 2)}</pre></div>`;
    });