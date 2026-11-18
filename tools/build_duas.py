"""Generate src/data/duas.ts for Sakinah.

Morning/evening adhkar: Arabic, English, transliteration, count, virtue from
Seen-Arabic/Morning-And-Evening-Adhkar-DB (MIT). Titles, short references and
Somali drafts are ours. All other categories are written here from Hisnul Muslim.
Every Somali meaning ships with soReviewed=False until a reviewer approves it.
"""
import json
import sys

src_path, out_path = sys.argv[1], sys.argv[2]
ds = {x["order"]: x for x in json.load(open(src_path, encoding="utf-8"))}

# order -> (title_en, title_so, ref, somali, arabic_override or None, english_override or None, keep_virtue)
ME = {
    2: ("Ayat al-Kursi", "Aayatul Kursi", "Al-Baqarah 2:255; an-Nasa'i, al-Kubra 10731",
        "Allaah, ilaah xaq lagu caabudo ma jiro isaga mooyee, waa Nool, waa Ka wax walba haya. Lulmo iyo hurdo midna ma qabato. Waxa samooyinka iyo dhulka ku jira oo dhan isaga ayaa leh. Yaa u shafeeci kara isaga agtiisa idankiisa la'aan? Wuxuu ogyahay waxa ka horreeya iyo waxa ka dambeeya, waxba kama koobaan cilmigiisa wuxuu doono mooyee. Kursigiisu wuxuu ballaadhay samooyinka iyo dhulka, mana daaliyo ilaalintoodu, isaga ayaana ah Ka Sarreeya, Ka Weyn.",
        None, None, True),
    3: ("The last two verses of al-Baqarah", "Labada aayadood ee ugu dambeeya al-Baqarah", "Al-Baqarah 2:285-286; al-Bukhari 5009, Muslim 807",
        "Rasuulku wuu rumeeyay waxa xagga Rabbigii looga soo dejiyay, mu'miniintuna sidoo kale. Dhammaan waxay rumeeyeen Allaah, malaa'igtiisa, kutubtiisa iyo rasuulladiisa, iyagoo leh: kala sooci mayno rasuulladiisa midkoodna. Waxayna yidhaahdeen: waan maqalnay oo waan addeecnay, ee dambi dhaaf Rabbiyow, xaggaagaana loo noqonayaa. Allaah naf kuma waajibiyo wax aan ka awood badnayn. Rabbiyow ha nagu qaban haddaan ilownay ama aan qaldannay...",
        None, None, True),
    4: ("Surah al-Ikhlas", "Suuradda al-Ikhlaas", "Al-Ikhlas 112; Abu Dawud 5082, at-Tirmidhi 3575",
        "Dheh: Isaga waa Allaah, Kali ah. Allaah waa Ka loo baahan yahay ee aan waxba u baahnayn. Wax ma dhalin, lamana dhalin. Mana jiro wax la mid ah.",
        None, None, True),
    5: ("Surah al-Falaq", "Suuradda al-Falaq", "Al-Falaq 113; Abu Dawud 5082, at-Tirmidhi 3575",
        "Dheh: Waxaan magan u galay Rabbiga waaberiga, sharka waxa uu abuuray, sharka habeenka marka uu madoobaado, sharka kuwa xidhmooyinka ku tufa, iyo sharka xaasidka marka uu xasdo.",
        None, None, True),
    6: ("Surah an-Nas", "Suuradda an-Naas", "An-Nas 114; Abu Dawud 5082, at-Tirmidhi 3575",
        "Dheh: Waxaan magan u galay Rabbiga dadka, Boqorka dadka, Ilaaha dadka, sharka waswaasiyaha dib u dhuunta, ee ku waswaasiya laabta dadka, jinni iyo insiba.",
        None, None, True),
    7: ("We have reached the morning", "Waan soo gaadhnay subaxa", "Muslim 2723",
        "Waan soo gaadhnay subaxa, boqortooyaduna waxay u subaxday Allaah, mahadna Allaah ayaa leh. Ilaah xaq lagu caabudo ma jiro Allaah mooyee, keligiis ah oo aan shariig lahayn; boqortooyada iyo mahadda isaga ayaa leh, wax walbana wuu karaa. Rabbiyow waxaan ku weydiinayaa khayrka maalintan iyo khayrka waxa ka dambeeya, waxaanan kaa magan galayaa sharka maalintan iyo sharka waxa ka dambeeya. Rabbiyow waxaan kaa magan galayaa caajisnimada iyo duqnimada xun. Rabbiyow waxaan kaa magan galayaa cadaabta naarta iyo cadaabta qabriga.",
        None, None, True),
    8: ("We have reached the evening", "Waan soo gaadhnay fiidka", "Muslim 2723",
        "Waan soo gaadhnay fiidka, boqortooyaduna waxay u fiidowday Allaah, mahadna Allaah ayaa leh. Ilaah xaq lagu caabudo ma jiro Allaah mooyee, keligiis ah oo aan shariig lahayn; boqortooyada iyo mahadda isaga ayaa leh, wax walbana wuu karaa. Rabbiyow waxaan ku weydiinayaa khayrka habeenkan iyo khayrka waxa ka dambeeya, waxaanan kaa magan galayaa sharka habeenkan iyo sharka waxa ka dambeeya. Rabbiyow waxaan kaa magan galayaa caajisnimada iyo duqnimada xun. Rabbiyow waxaan kaa magan galayaa cadaabta naarta iyo cadaabta qabriga.",
        "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ",
        None, True),
    9: ("By You we enter the morning", "Adiga ayaan kugu subaxnay", "At-Tirmidhi 3391",
        "Allow adiga ayaan kugu subaxnay, adiga ayaan kugu fiidownay, adiga ayaan kugu noolnahay, adiga ayaan kugu dhimanaynaa, xaggaagaana loo soo bixi doonaa.",
        None, None, True),
    10: ("By You we enter the evening", "Adiga ayaan kugu fiidownay", "At-Tirmidhi 3391",
         "Allow adiga ayaan kugu fiidownay, adiga ayaan kugu subaxnay, adiga ayaan kugu noolnahay, adiga ayaan kugu dhimanaynaa, xaggaagaana loo noqonayaa.",
         "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ",
         None, True),
    11: ("The master of seeking forgiveness", "Sayyidul Istighfaar", "Al-Bukhari 6306",
         "Allow adiga ayaa Rabbigay ah, ilaah xaq lagu caabudo ma jiro adiga mooyee. Adigaa i abuuray, anna waxaan ahay addoonkaaga, waxaanan ku taaganahay ballankaaga iyo ballanqaadkaaga intii aan karo. Waxaan kaa magan galayaa sharka waxaan sameeyay. Waan qirayaa nicmadaada aad ii gashay, waanan qirayaa dambigayga, ee ii dambi dhaaf, maxaa yeelay dambiyada cid kale ma dhaafto adiga mooyee.",
         None, None, True),
    12: ("I call You to witness this morning", "Waxaan ku markhaati ka dhigayaa subaxan", "Abu Dawud 5069",
         "Allow waxaan soo gaadhay subaxa anigoo ku markhaati ka dhigaya adiga, kuwa sida carshigaaga, malaa'igtaada iyo dhammaan khalqigaaga, inaad tahay Allaah, ilaah xaq lagu caabudo ma jiro adiga mooyee, keligaa ah oo aan shariig lahayn, Muxammadna yahay addoonkaaga iyo rasuulkaaga.",
         None, None, True),
    13: ("I call You to witness this evening", "Waxaan ku markhaati ka dhigayaa fiidkan", "Abu Dawud 5069",
         "Allow waxaan soo gaadhay fiidka anigoo ku markhaati ka dhigaya adiga, kuwa sida carshigaaga, malaa'igtaada iyo dhammaan khalqigaaga, inaad tahay Allaah, ilaah xaq lagu caabudo ma jiro adiga mooyee, keligaa ah oo aan shariig lahayn, Muxammadna yahay addoonkaaga iyo rasuulkaaga.",
         "اللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلَائِكَتَكَ، وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لَا إِلَهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ",
         None, True),
    14: ("Thanks for the blessings of the morning", "Mahadnaqa nicmooyinka subaxa", "Abu Dawud 5073",
         "Allow nicmad kasta oo aan ku subaxay, ama qof ka mid ah khalqigaaga uu ku subaxay, adiga keligaa ayay ka timid, shariig ma lihid; ee mahadda iyo ammaanta adigaa iska leh.",
         None, None, True),
    15: ("Thanks for the blessings of the evening", "Mahadnaqa nicmooyinka fiidka", "Abu Dawud 5073",
         "Allow nicmad kasta oo aan ku fiidoobay, ama qof ka mid ah khalqigaaga uu ku fiidoobay, adiga keligaa ayay ka timid, shariig ma lihid; ee mahadda iyo ammaanta adigaa iska leh.",
         "اللَّهُمَّ مَا أَمْسَى بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ",
         None, True),
    16: ("Wellbeing of body, hearing and sight", "Caafimaadka jidhka, maqalka iyo aragga", "Abu Dawud 5090",
         "Allow jidhkayga caafimaad sii, Allow maqalkayga caafimaad sii, Allow araggayga caafimaad sii, ilaah xaq lagu caabudo ma jiro adiga mooyee. Allow waxaan kaa magan galayaa gaalnimada iyo faqriga, waxaanan kaa magan galayaa cadaabta qabriga, ilaah xaq lagu caabudo ma jiro adiga mooyee.",
         None, None, False),
    17: ("Allah is sufficient for me", "Allaah ayaa igu filan", "Abu Dawud 5081",
         "Allaah ayaa igu filan, ilaah xaq lagu caabudo ma jiro isaga mooyee, isaga ayaan isku halleeyay, waana Rabbiga carshiga weyn.",
         None, None, False),
    18: ("Pardon and wellbeing", "Cafis iyo caafimaad", "Abu Dawud 5074, Ibn Majah 3871",
         "Allow waxaan ku weydiinayaa cafis iyo caafimaad adduunka iyo aakhirada. Allow waxaan ku weydiinayaa cafis iyo caafimaad diintayda, adduunkayga, ehelkayga iyo maalkayga. Allow qari ceebahayga, iga nabadgeli cabsidayda. Allow iga ilaali hortayda, gadaashayda, midigtayda, bidixdayda iyo korkayga, waxaanan ku magan galayaa weynaantaada in hoostayda la iga dilo.",
         None, None, False),
    19: ("Knower of the unseen and the seen", "Ogaha waxa maqan iyo waxa muuqda", "At-Tirmidhi 3392, Abu Dawud 5067",
         "Allow Ogaha waxa maqan iyo waxa muuqda, Abuuraha samooyinka iyo dhulka, Rabbiga wax walba iyo Boqorkooda, waxaan markhaati ka ahay in ilaah xaq lagu caabudo aanu jirin adiga mooyee. Waxaan kaa magan galayaa sharka naftayda, sharka shaydaanka iyo shirkiisa, iyo inaan naftayda xumaan ku sameeyo ama aan u geysto Muslim kale.",
         None, None, False),
    20: ("Protection by Allah's name", "Ka-ilaalin magaca Allaah", "Abu Dawud 5088, at-Tirmidhi 3388",
         "Magaca Allaah, ee magaciisa la xuso aanu waxba dhulka iyo samada ku jiraa waxyeello keenin, Isaga ayaana ah Maqlaha, Ogaha.",
         None, "In the name of Allah, with whose name nothing on earth or in the heavens can cause harm, and He is the All-Hearing, the All-Knowing.", True),
    21: ("Pleased with Allah as my Lord", "Waan ku raalli ahay Allaah", "Abu Dawud 5072, at-Tirmidhi 3389",
         "Waxaan ku raalli ahay Allaah inuu Rabbi ii yahay, Islaamka inuu diin ii yahay, Muxammad (scw) inuu Nabi ii yahay.",
         None, None, True),
    22: ("O Ever-Living, O Sustainer", "Yaa Xayyu Yaa Qayyuum", "An-Nasa'i, al-Kubra 10405; al-Hakim 1/545",
         "Yaa Ka Nool, Yaa Ka wax walba haya, naxariistaada ayaan gargaar ku dalbanayaa; arrimahayga oo dhan ii hagaaji, hana ii daynin naftayda xitaa il-biriqsi.",
         None, None, False),
    23: ("The good of this day", "Khayrka maalintan", "Abu Dawud 5084",
         "Waan soo gaadhnay subaxa, boqortooyaduna waxay u subaxday Allaah, Rabbiga caalamka. Allow waxaan ku weydiinayaa khayrka maalintan: guusheeda, gargaarkeeda, nuurkeeda, barakadeeda iyo hanuunkeeda, waxaanan kaa magan galayaa sharka maalintan iyo sharka ka dambeeya.",
         None, None, False),
    24: ("The good of this night", "Khayrka habeenkan", "Abu Dawud 5084",
         "Waan soo gaadhnay fiidka, boqortooyaduna waxay u fiidowday Allaah, Rabbiga caalamka. Allow waxaan ku weydiinayaa khayrka habeenkan: guushiisa, gargaarkiisa, nuurkiisa, barakadiisa iyo hanuunkiisa, waxaanan kaa magan galayaa sharka habeenkan iyo sharka ka dambeeya.",
         "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ رَبِّ الْعَالَمِينَ، اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذِهِ اللَّيْلَةِ: فَتْحَهَا، وَنَصْرَهَا، وَنُورَهَا، وَبَرَكَتَهَا، وَهُدَاهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِيهَا وَشَرِّ مَا بَعْدَهَا",
         None, False),
    25: ("Upon the fitrah of Islam (morning)", "Fidradii Islaamka (subax)", "Ahmad 15360",
         "Waxaan ku subaxnay fidradii Islaamka, kalimadii ikhlaaska, diintii Nabigeenna Muxammad (scw), iyo milladdii aabbeheen Ibraahim, oo ahaa toosane Muslim ah, mana ahayn mushrikiinta.",
         None, None, False),
    26: ("Upon the fitrah of Islam (evening)", "Fidradii Islaamka (fiid)", "Ahmad 15360",
         "Waxaan ku fiidownay fidradii Islaamka, kalimadii ikhlaaska, diintii Nabigeenna Muxammad (scw), iyo milladdii aabbeheen Ibraahim, oo ahaa toosane Muslim ah, mana ahayn mushrikiinta.",
         "أَمْسَيْنَا عَلَى فِطْرَةِ الْإِسْلَامِ، وَعَلَى كَلِمَةِ الْإِخْلَاصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ ﷺ، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ، حَنِيفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِينَ",
         None, False),
    27: ("Beneficial knowledge", "Cilmi anfacaya", "Ibn Majah 925",
         "Allow waxaan ku weydiinayaa cilmi anfacaya, risiq wanaagsan iyo camal la aqbalo.",
         None, None, False),
    28: ("Tahlil ten times", "Tahliil toban jeer", "Abu Dawud 5077, Ibn Majah 3867",
         "Ilaah xaq lagu caabudo ma jiro Allaah mooyee, keligiis ah oo aan shariig lahayn; boqortooyada iyo mahadda isaga ayaa leh, wax walbana wuu karaa.",
         None, None, True),
    30: ("Allah's perfect words", "Erayada Allaah ee dhammaystiran", "Muslim 2709",
         "Waxaan magan u galay erayada Allaah ee dhammaystiran, sharka waxa uu abuuray.",
         None, None, True),
    31: ("Glory by the number of His creation", "Tasbiix tirada khalqigiisa", "Muslim 2726",
         "Allaah waa nasahan yahay mahaddiisana waan ku ammaanayaa: tirada khalqigiisa, raalli ahaanshaha naftiisa, miisaanka carshigiisa iyo khadka erayadiisa.",
         None, None, False),
    32: ("Tahlil one hundred times", "Tahliil boqol jeer", "Al-Bukhari 3293, Muslim 2691",
         "Ilaah xaq lagu caabudo ma jiro Allaah mooyee, keligiis ah oo aan shariig lahayn; boqortooyada iyo mahadda isaga ayaa leh, wax walbana wuu karaa.",
         None, None, True),
    33: ("Seeking forgiveness one hundred times", "Istighfaar boqol jeer", "Al-Bukhari 6307, Muslim 2702",
         "Waxaan dambi dhaaf weydiisanayaa Allaah, waanan u toobad keenayaa.",
         None, None, False),
    34: ("SubhanAllah wa bihamdihi", "Subxaanallaahi wa bixamdihi", "Muslim 2692",
         "Allaah waa nasahan yahay, mahaddiisana waan ku ammaanayaa.",
         None, None, True),
}

duas = []

def add(id_, cats, title_en, title_so, ar, tr, en, so, ref, repeat=1, virtue=None):
    duas.append({
        "id": id_, "categories": cats, "title": {"en": title_en, "so": title_so},
        "arabic": ar.strip(), "transliteration": tr.strip(), "english": en.strip(),
        "somali": so.strip(), "somaliReviewed": False, "reference": ref,
        "repeat": repeat, "virtue": virtue,
    })

for order in sorted(ME):
    title_en, title_so, ref, so, ar_o, en_o, keep_v = ME[order]
    x = ds[order]
    cats = {0: ["morning", "evening"], 1: ["morning"], 2: ["evening"]}[x["type"]]
    if order in (2, 3, 4, 5, 6):
        cats = cats + ["sleep"]
    if order in (11, 33):
        cats = cats + ["forgiveness"]
    virtue = x["fadl"].strip() if keep_v and x["fadl"].strip() else None
    add(f"me-{order:02d}", cats, title_en, title_so, ar_o or x["content"],
        x["transliteration"], en_o or x["translation"], so, ref, int(x["count"]), virtue)

# ---------- Waking up ----------
add("wake-1", ["waking"], "On waking up", "Marka la toosayo",
    "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    "Al-ḥamdu lillāhil-ladhī aḥyānā baʿda mā amātanā wa ilayhin-nushūr.",
    "All praise is for Allah, who gave us life after He had caused us to die, and to Him is the resurrection.",
    "Mahad waxaa leh Allaah, ee na soo nooleeyay kadib markuu na dilay, xaggiisaana loo soo bixi doonaa.",
    "Al-Bukhari 6312")
add("wake-2", ["waking"], "Thanks for health and life", "Mahadnaqa caafimaadka iyo nolosha",
    "الْحَمْدُ لِلَّهِ الَّذِي عَافَانِي فِي جَسَدِي، وَرَدَّ عَلَيَّ رُوحِي، وَأَذِنَ لِي بِذِكْرِهِ",
    "Al-ḥamdu lillāhil-ladhī ʿāfānī fī jasadī, wa radda ʿalayya rūḥī, wa adhina lī bi-dhikrih.",
    "All praise is for Allah, who gave health to my body, returned my soul to me and allowed me to remember Him.",
    "Mahad waxaa leh Allaah, ee jidhkayga caafimaad siiyay, ruuxaydana ii soo celiyay, iina oggolaaday inaan xuso.",
    "At-Tirmidhi 3401")

# ---------- Sleep ----------
add("sleep-1", ["sleep"], "Before sleeping", "Kahor intaan la seexan",
    "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    "Bismika Allāhumma amūtu wa aḥyā.",
    "In Your name, O Allah, I die and I live.",
    "Magacaaga Allow ayaan ku dhimanayaa kuna noolaanayaa.",
    "Al-Bukhari 6324")
add("sleep-2", ["sleep"], "In Your name I lie down", "Magacaaga ayaan ku jiifsaday",
    "بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ",
    "Bismika Rabbī waḍaʿtu janbī, wa bika arfaʿuh, fa-in amsakta nafsī farḥamhā, wa in arsaltahā faḥfaẓhā bimā taḥfaẓu bihi ʿibādakaṣ-ṣāliḥīn.",
    "In Your name, my Lord, I lay down my side, and by You I raise it. If You take my soul, have mercy on it, and if You release it, protect it as You protect Your righteous servants.",
    "Magacaaga Rabbiyow ayaan dhinacayga ku dhigay, adigaana ku kicinayaa. Haddaad naftayda qabato u naxariiso, haddaad sii daysana ku ilaali waxaad ku ilaaliso addoomahaaga suuban.",
    "Al-Bukhari 6320, Muslim 2714")
add("sleep-3", ["sleep"], "Protect me on the Day of Resurrection", "Iga dhowr cadaabka maalinta qiyaamaha",
    "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ",
    "Allāhumma qinī ʿadhābaka yawma tabʿathu ʿibādak.",
    "O Allah, protect me from Your punishment on the day You resurrect Your servants.",
    "Allow iga dhowr cadaabkaaga maalinta aad soo bixin doonto addoomahaaga.",
    "Abu Dawud 5045, at-Tirmidhi 3398", 3)
add("sleep-4", ["sleep"], "Tasbih before sleep", "Tasbiixda hurdada",
    "سُبْحَانَ اللَّهِ (٣٣) وَالْحَمْدُ لِلَّهِ (٣٣) وَاللَّهُ أَكْبَرُ (٣٤)",
    "SubḥānAllāh (33), al-ḥamdu lillāh (33), Allāhu akbar (34).",
    "Glory be to Allah (33 times), all praise is for Allah (33 times), Allah is the Greatest (34 times).",
    "Allaah waa nasahan yahay (33), mahad waxaa leh Allaah (33), Allaah ayaa weyn (34).",
    "Al-Bukhari 3705, Muslim 2727", 100,
    "The Prophet ﷺ taught this to Ali and Fatimah and said it is better for them than a servant.")
add("sleep-5", ["sleep"], "I submit myself to You", "Naftayda waan kuu dhiibay",
    "اللَّهُمَّ أَسْلَمْتُ نَفْسِي إِلَيْكَ، وَفَوَّضْتُ أَمْرِي إِلَيْكَ، وَأَلْجَأْتُ ظَهْرِي إِلَيْكَ، رَغْبَةً وَرَهْبَةً إِلَيْكَ، لَا مَلْجَأَ وَلَا مَنْجَا مِنْكَ إِلَّا إِلَيْكَ، آمَنْتُ بِكِتَابِكَ الَّذِي أَنْزَلْتَ، وَبِنَبِيِّكَ الَّذِي أَرْسَلْتَ",
    "Allāhumma aslamtu nafsī ilayk, wa fawwaḍtu amrī ilayk, wa alja'tu ẓahrī ilayk, raghbatan wa rahbatan ilayk, lā maljā'a wa lā manjā minka illā ilayk, āmantu bi-kitābikal-ladhī anzalt, wa bi-nabiyyikal-ladhī arsalt.",
    "O Allah, I submit myself to You, entrust my affairs to You and rely completely on You, out of hope and fear of You. There is no refuge and no escape from You except to You. I believe in Your Book which You revealed and in Your Prophet whom You sent.",
    "Allow naftayda waan kuu dhiibay, arrinkaygana waan kuu wakiishay, dhabarkaygana adiga ayaan ku tiirsaday, anigoo ku rajaynaya kana cabsanaya. Magangal iyo badbaado midna kaama jiraan adiga mooyee. Waxaan rumeeyay kitaabkaaga aad soo dejisay iyo nabigaaga aad soo dirtay.",
    "Al-Bukhari 6313, Muslim 2710", 1,
    "Whoever says it and dies that night dies upon the fitrah.")

# ---------- Home ----------
add("home-1", ["home"], "Leaving the house", "Ka bixidda guriga",
    "بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    "Bismillāh, tawakkaltu ʿalallāh, wa lā ḥawla wa lā quwwata illā billāh.",
    "In the name of Allah. I place my trust in Allah, and there is no might nor power except with Allah.",
    "Magaca Allaah. Allaah ayaan isku halleeyay, xoog iyo awood midna ma jiraan Allaah mooyee.",
    "Abu Dawud 5095, at-Tirmidhi 3426", 1,
    "It is said to the one who says it: you are guided, sufficed and protected, and the devil turns away from him.")
add("home-2", ["home"], "Protection when going out", "Ilaalinta marka la baxayo",
    "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ أَنْ أَضِلَّ أَوْ أُضَلَّ، أَوْ أَزِلَّ أَوْ أُزَلَّ، أَوْ أَظْلِمَ أَوْ أُظْلَمَ، أَوْ أَجْهَلَ أَوْ يُجْهَلَ عَلَيَّ",
    "Allāhumma innī aʿūdhu bika an aḍilla aw uḍall, aw azilla aw uzall, aw aẓlima aw uẓlam, aw ajhala aw yujhala ʿalayy.",
    "O Allah, I seek refuge in You from going astray or being led astray, from slipping or being made to slip, from wronging others or being wronged, and from acting foolishly or being treated foolishly.",
    "Allow waxaan kaa magan galayaa inaan lumo ama la i lumiyo, inaan simbiriirixdo ama la i simbiriirixiyo, inaan dulmiyo ama la i dulmiyo, iyo inaan jaahilnimo sameeyo ama jaahilnimo la igu sameeyo.",
    "Abu Dawud 5094, at-Tirmidhi 3427")
add("home-3", ["home"], "Entering the house", "Gelitaanka guriga",
    "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا",
    "Bismillāhi walajnā, wa bismillāhi kharajnā, wa ʿalallāhi rabbinā tawakkalnā.",
    "In the name of Allah we enter, in the name of Allah we leave, and upon Allah our Lord we rely. Then greet your family.",
    "Magaca Allaah ayaan ku galnay, magaca Allaah ayaan ku baxnay, Allaah Rabbigeen ah ayaan isku hallaynay. Kadibna ehelkaaga salaan.",
    "Abu Dawud 5096")

# ---------- Toilet ----------
add("toilet-1", ["toilet"], "Entering the toilet", "Gelitaanka musqusha",
    "بِسْمِ اللَّهِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
    "Bismillāh. Allāhumma innī aʿūdhu bika minal-khubuthi wal-khabā'ith.",
    "In the name of Allah. O Allah, I seek refuge in You from the male and female devils.",
    "Magaca Allaah. Allow waxaan kaa magan galayaa shayaadiinta labka iyo dheddigga.",
    "Al-Bukhari 142, Muslim 375")
add("toilet-2", ["toilet"], "Leaving the toilet", "Ka bixidda musqusha",
    "غُفْرَانَكَ",
    "Ghufrānak.",
    "I ask for Your forgiveness.",
    "Waxaan ku weydiinayaa dambi dhaafkaaga.",
    "Abu Dawud 30, at-Tirmidhi 7")

# ---------- Eating ----------
add("eat-1", ["eating"], "Before eating", "Kahor cuntada",
    "بِسْمِ اللَّهِ",
    "Bismillāh.",
    "In the name of Allah.",
    "Magaca Allaah.",
    "Abu Dawud 3767, at-Tirmidhi 1858")
add("eat-2", ["eating"], "If you forgot at the start", "Haddaad ilowday bilowga",
    "بِسْمِ اللَّهِ أَوَّلَهُ وَآخِرَهُ",
    "Bismillāhi awwalahu wa ākhirah.",
    "In the name of Allah, at its beginning and at its end.",
    "Magaca Allaah, bilowgeeda iyo dhammaadkeeda.",
    "Abu Dawud 3767, at-Tirmidhi 1858")
add("eat-3", ["eating"], "After eating", "Kadib cuntada",
    "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا، وَرَزَقَنِيهِ، مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
    "Al-ḥamdu lillāhil-ladhī aṭʿamanī hādhā, wa razaqanīhi, min ghayri ḥawlin minnī wa lā quwwah.",
    "All praise is for Allah, who fed me this and provided it for me without any might or power from me.",
    "Mahad waxaa leh Allaah, ee cuntadan i quudiyay, iina arzuqay, xoog iyo awood aan anigu lahayn la'aanteed.",
    "Abu Dawud 4023, at-Tirmidhi 3458", 1,
    "Whoever says it after eating, his past sins are forgiven.")
add("eat-4", ["eating"], "Abundant praise after eating", "Mahad badan kadib cuntada",
    "الْحَمْدُ لِلَّهِ حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ، غَيْرَ مَكْفِيٍّ وَلَا مُوَدَّعٍ، وَلَا مُسْتَغْنًى عَنْهُ رَبَّنَا",
    "Al-ḥamdu lillāhi ḥamdan kathīran ṭayyiban mubārakan fīh, ghayra makfiyyin wa lā muwaddaʿin wa lā mustaghnan ʿanhu rabbanā.",
    "All praise is for Allah, abundant, pure and blessed praise, praise that is never enough, never abandoned and never done without, our Lord.",
    "Mahad waxaa leh Allaah, mahad badan, wanaagsan oo barakaysan, mahad aan la dhammayn karin, aan laga tagin, laga maarmin, Rabbigayow.",
    "Al-Bukhari 5458")
add("eat-5", ["eating"], "Dua for your host", "Ducada martigeliyaha",
    "اللَّهُمَّ بَارِكْ لَهُمْ فِيمَا رَزَقْتَهُمْ، وَاغْفِرْ لَهُمْ وَارْحَمْهُمْ",
    "Allāhumma bārik lahum fīmā razaqtahum, waghfir lahum warḥamhum.",
    "O Allah, bless them in what You have provided for them, forgive them and have mercy on them.",
    "Allow u barakee waxaad arzuqday, una dambi dhaaf, una naxariiso.",
    "Muslim 2042")
add("eat-6", ["eating"], "Breaking the fast", "Afurka",
    "ذَهَبَ الظَّمَأُ، وَابْتَلَّتِ الْعُرُوقُ، وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ",
    "Dhahabaẓ-ẓama', wabtallatil-ʿurūq, wa thabatal-ajru in shā' Allāh.",
    "The thirst is gone, the veins are moistened, and the reward is certain, if Allah wills.",
    "Harraadkii waa tegay, xididdadii waa qoyeen, ajarkiina waa sugnaaday haddii Allaah idmo.",
    "Abu Dawud 2357")

# ---------- Mosque ----------
add("mosque-1", ["mosque"], "Refuge on entering the mosque", "Magangalka marka masjidka la galayo",
    "أَعُوذُ بِاللَّهِ الْعَظِيمِ، وَبِوَجْهِهِ الْكَرِيمِ، وَسُلْطَانِهِ الْقَدِيمِ، مِنَ الشَّيْطَانِ الرَّجِيمِ",
    "Aʿūdhu billāhil-ʿaẓīm, wa bi-wajhihil-karīm, wa sulṭānihil-qadīm, minash-shayṭānir-rajīm.",
    "I seek refuge in Allah the Mighty, in His noble face and His eternal authority, from the accursed devil.",
    "Waxaan magan u galay Allaah ka weyn, wejigiisa sharafta leh iyo awooddiisa weligeed jirtay, shaydaanka la fogeeyay.",
    "Abu Dawud 466", 1,
    "Whoever says it, the devil says: he is protected from me for the rest of the day.")
add("mosque-2", ["mosque"], "Entering the mosque", "Gelitaanka masjidka",
    "بِسْمِ اللَّهِ، وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ، اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    "Bismillāh, waṣ-ṣalātu was-salāmu ʿalā rasūlillāh. Allāhummaftaḥ lī abwāba raḥmatik.",
    "In the name of Allah, and peace and blessings be upon the Messenger of Allah. O Allah, open the gates of Your mercy for me.",
    "Magaca Allaah, nabadgelyo iyo naxariisina ha ahaato Rasuulka Allaah. Allow ii fur albaabbada naxariistaada.",
    "Muslim 713, Abu Dawud 465")
add("mosque-3", ["mosque"], "Leaving the mosque", "Ka bixidda masjidka",
    "بِسْمِ اللَّهِ، وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
    "Bismillāh, waṣ-ṣalātu was-salāmu ʿalā rasūlillāh. Allāhumma innī as'aluka min faḍlik.",
    "In the name of Allah, and peace and blessings be upon the Messenger of Allah. O Allah, I ask You of Your bounty.",
    "Magaca Allaah, nabadgelyo iyo naxariisina ha ahaato Rasuulka Allaah. Allow waxaan ku weydiinayaa fadligaaga.",
    "Muslim 713, Ibn Majah 773")
add("mosque-4", ["mosque"], "After the prayer", "Salaadda kadib",
    "أَسْتَغْفِرُ اللَّهَ (ثَلَاثًا)، اللَّهُمَّ أَنْتَ السَّلَامُ، وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
    "Astaghfirullāh (3 times). Allāhumma antas-salām, wa minkas-salām, tabārakta yā dhal-jalāli wal-ikrām.",
    "I seek Allah's forgiveness (3 times). O Allah, You are Peace and from You comes peace. Blessed are You, O Owner of majesty and honour.",
    "Waxaan dambi dhaaf weydiisanayaa Allaah (3 jeer). Allow adigaa nabad ah, xaggaagaana nabadi ka timaaddaa. Waad barakaysan tahay, Yaa Kan sharafta iyo karaamada leh.",
    "Muslim 591")

# ---------- Travel ----------
add("travel-1", ["travel"], "Riding a vehicle", "Fuulitaanka gaadiidka",
    "بِسْمِ اللَّهِ، الْحَمْدُ لِلَّهِ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ، الْحَمْدُ لِلَّهِ، الْحَمْدُ لِلَّهِ، الْحَمْدُ لِلَّهِ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، سُبْحَانَكَ اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    "Bismillāh, al-ḥamdu lillāh, subḥānal-ladhī sakhkhara lanā hādhā wa mā kunnā lahu muqrinīn, wa innā ilā rabbinā lamunqalibūn. Al-ḥamdu lillāh (3), Allāhu akbar (3), subḥānaka Allāhumma innī ẓalamtu nafsī faghfir lī, fa-innahu lā yaghfirudh-dhunūba illā ant.",
    "In the name of Allah. All praise is for Allah. Glory be to the One who has subjected this to us, and we could never have done it ourselves, and to our Lord we will surely return. All praise is for Allah (3 times). Allah is the Greatest (3 times). Glory be to You, O Allah; I have wronged myself, so forgive me, for none forgives sins except You.",
    "Magaca Allaah, mahad waxaa leh Allaah. Waxaa nasahan Kan noo sakhiray kan, mana aanaan awood u lahayn, Rabbigeenna ayaana u noqon doonnaa. Mahad waxaa leh Allaah (3), Allaah ayaa weyn (3). Waad nasahan tahay Allow, naftayda waan dulmiyay ee ii dambi dhaaf, maxaa yeelay dambiyada cid kale ma dhaafto adiga mooyee.",
    "Abu Dawud 2602, at-Tirmidhi 3446")
add("travel-2", ["travel"], "Dua for travel", "Ducada safarka",
    "اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ، اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ، اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ، وَالْخَلِيفَةُ فِي الْأَهْلِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ وَعْثَاءِ السَّفَرِ، وَكَآبَةِ الْمَنْظَرِ، وَسُوءِ الْمُنْقَلَبِ فِي الْمَالِ وَالْأَهْلِ",
    "Allāhu akbar (3). Subḥānal-ladhī sakhkhara lanā hādhā wa mā kunnā lahu muqrinīn, wa innā ilā rabbinā lamunqalibūn. Allāhumma innā nas'aluka fī safarinā hādhal-birra wat-taqwā, wa minal-ʿamali mā tarḍā. Allāhumma hawwin ʿalaynā safaranā hādhā waṭwi ʿannā buʿdah. Allāhumma antaṣ-ṣāḥibu fis-safar, wal-khalīfatu fil-ahl. Allāhumma innī aʿūdhu bika min waʿthā'is-safar, wa ka'ābatil-manẓar, wa sū'il-munqalabi fil-māli wal-ahl.",
    "Allah is the Greatest (3 times). Glory be to the One who has subjected this to us, and we could never have done it ourselves, and to our Lord we will surely return. O Allah, we ask You on this journey for righteousness and piety, and for deeds that please You. O Allah, make this journey easy for us and shorten its distance. O Allah, You are the Companion on the journey and the Guardian of the family. O Allah, I seek refuge in You from the hardship of travel, from distressing sights, and from an evil return to wealth and family.",
    "Allaah ayaa weyn (3). Waxaa nasahan Kan noo sakhiray kan, mana aanaan awood u lahayn, Rabbigeenna ayaana u noqon doonnaa. Allow waxaan safarkan kugu weydiinaynaa wanaag iyo cabsi Ilaahay, iyo camal aad raalli ka tahay. Allow noo fududee safarkan, noona soo dhawee masaafadiisa. Allow adigaa saaxiibka safarka ah, ehelkana u hadha. Allow waxaan kaa magan galayaa dhibaatada safarka, muuqaal murugo leh, iyo inaan si xun ugu soo noqdo maalka iyo ehelka.",
    "Muslim 1342")
add("travel-3", ["travel"], "Returning from travel", "Ka soo noqoshada safarka",
    "آيِبُونَ، تَائِبُونَ، عَابِدُونَ، لِرَبِّنَا حَامِدُونَ",
    "Āyibūna, tā'ibūna, ʿābidūna, li-rabbinā ḥāmidūn.",
    "We are returning, repenting, worshipping, and praising our Lord.",
    "Waan soo noqonaynaa, toobad keenaynaa, caabudaynaa, Rabbigeenna ayaanan mahadinaynaa.",
    "Muslim 1342")
add("travel-4", ["travel"], "Stopping at a place", "Marka meel lagu dego",
    "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    "Aʿūdhu bi-kalimātillāhit-tāmmāti min sharri mā khalaq.",
    "I seek refuge in the perfect words of Allah from the evil of what He has created.",
    "Waxaan magan u galay erayada Allaah ee dhammaystiran, sharka waxa uu abuuray.",
    "Muslim 2708", 1,
    "Nothing will harm him until he leaves that place.")
add("travel-5", ["travel"], "The traveller to those staying", "Socotada u ducaysa kuwa hadhaya",
    "أَسْتَوْدِعُكُمُ اللَّهَ الَّذِي لَا تَضِيعُ وَدَائِعُهُ",
    "Astawdiʿukumullāhal-ladhī lā taḍīʿu wadā'iʿuh.",
    "I leave you in the care of Allah, whose trusts are never lost.",
    "Waxaan idinku dhiibay Allaah, kan amaanadiisu aanay lumin.",
    "Ibn Majah 2825")
add("travel-6", ["travel"], "Those staying to the traveller", "Kuwa hadhaya u ducaysta socotada",
    "أَسْتَوْدِعُ اللَّهَ دِينَكَ، وَأَمَانَتَكَ، وَخَوَاتِيمَ عَمَلِكَ",
    "Astawdiʿullāha dīnaka, wa amānataka, wa khawātīma ʿamalik.",
    "I entrust to Allah your religion, your trust and the end of your deeds.",
    "Waxaan Allaah u dhiibay diintaada, amaanadaada iyo dhammaadka camalkaaga.",
    "At-Tirmidhi 3443")

# ---------- Worry and distress ----------
add("worry-1", ["worry"], "For worry and sadness", "Walwalka iyo murugada",
    "اللَّهُمَّ إِنِّي عَبْدُكَ، ابْنُ عَبْدِكَ، ابْنُ أَمَتِكَ، نَاصِيَتِي بِيَدِكَ، مَاضٍ فِيَّ حُكْمُكَ، عَدْلٌ فِيَّ قَضَاؤُكَ، أَسْأَلُكَ بِكُلِّ اسْمٍ هُوَ لَكَ سَمَّيْتَ بِهِ نَفْسَكَ، أَوْ أَنْزَلْتَهُ فِي كِتَابِكَ، أَوْ عَلَّمْتَهُ أَحَدًا مِنْ خَلْقِكَ، أَوِ اسْتَأْثَرْتَ بِهِ فِي عِلْمِ الْغَيْبِ عِنْدَكَ، أَنْ تَجْعَلَ الْقُرْآنَ رَبِيعَ قَلْبِي، وَنُورَ صَدْرِي، وَجَلَاءَ حُزْنِي، وَذَهَابَ هَمِّي",
    "Allāhumma innī ʿabduk, ibnu ʿabdik, ibnu amatik, nāṣiyatī bi-yadik, māḍin fiyya ḥukmuk, ʿadlun fiyya qaḍā'uk, as'aluka bi-kulli ismin huwa lak, sammayta bihi nafsak, aw anzaltahu fī kitābik, aw ʿallamtahu aḥadan min khalqik, awista'tharta bihi fī ʿilmil-ghaybi ʿindak, an tajʿalal-Qur'āna rabīʿa qalbī, wa nūra ṣadrī, wa jalā'a ḥuznī, wa dhahāba hammī.",
    "O Allah, I am Your servant, son of Your servant, son of Your maidservant. My forelock is in Your hand, Your judgement over me is done, and Your decree over me is just. I ask You by every name that is Yours, with which You named Yourself, revealed in Your Book, taught to any of Your creation, or kept with Yourself in the knowledge of the unseen, to make the Qur'an the spring of my heart, the light of my chest, the removal of my sadness and the end of my worry.",
    "Allow anigu waxaan ahay addoonkaaga, ina addoonkaaga, ina addoontaada. Fooddaydu gacantaada ayay ku jirtaa, xukunkaagu waa igu socdaa, qaddarkaaguna waa igu caddaalad. Waxaan kugu weydiinayaa magac kasta oo aad leedahay, oo aad naftaada ku magacawday, ama kitaabkaaga ku soo dejisay, ama aad bartay qof ka mid ah khalqigaaga, ama aad cilmiga ghaybka ah agtaada ku hayso, inaad Qur'aanka ka dhigto guga qalbigayga, nuurka laabtayda, ka saarista murugadayda iyo tagista walwalkayga.",
    "Ahmad 3712", 1,
    "Allah will remove his worry and replace his sadness with joy.")
add("worry-2", ["worry"], "Refuge from anxiety and grief", "Magangalka walwalka iyo murugada",
    "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ، وَغَلَبَةِ الرِّجَالِ",
    "Allāhumma innī aʿūdhu bika minal-hammi wal-ḥazan, wal-ʿajzi wal-kasal, wal-bukhli wal-jubn, wa ḍalaʿid-dayni wa ghalabatir-rijāl.",
    "O Allah, I seek refuge in You from anxiety and grief, weakness and laziness, miserliness and cowardice, the burden of debt and being overpowered by people.",
    "Allow waxaan kaa magan galayaa walwalka iyo murugada, tabar-darrida iyo caajisnimada, bakhaylnimada iyo fulaynimada, culayska deynta iyo in ragga la iga adkaado.",
    "Al-Bukhari 6369")
add("worry-3", ["worry"], "In times of distress", "Waqtiga dhibaatada",
    "لَا إِلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ السَّمَاوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ",
    "Lā ilāha illallāhul-ʿaẓīmul-ḥalīm, lā ilāha illallāhu rabbul-ʿarshil-ʿaẓīm, lā ilāha illallāhu rabbus-samāwāti wa rabbul-arḍi wa rabbul-ʿarshil-karīm.",
    "None has the right to be worshipped except Allah, the Mighty, the Forbearing. None has the right to be worshipped except Allah, Lord of the mighty Throne. None has the right to be worshipped except Allah, Lord of the heavens, Lord of the earth and Lord of the noble Throne.",
    "Ilaah xaq lagu caabudo ma jiro Allaah mooyee, ka weyn, ka dulqaadka badan. Ilaah xaq lagu caabudo ma jiro Allaah mooyee, Rabbiga carshiga weyn. Ilaah xaq lagu caabudo ma jiro Allaah mooyee, Rabbiga samooyinka, Rabbiga dhulka iyo Rabbiga carshiga sharafta leh.",
    "Al-Bukhari 6346, Muslim 2730")
add("worry-4", ["worry"], "Your mercy is what I hope for", "Naxariistaada ayaan rajaynayaa",
    "اللَّهُمَّ رَحْمَتَكَ أَرْجُو، فَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ، وَأَصْلِحْ لِي شَأْنِي كُلَّهُ، لَا إِلَهَ إِلَّا أَنْتَ",
    "Allāhumma raḥmataka arjū, fa-lā takilnī ilā nafsī ṭarfata ʿayn, wa aṣliḥ lī sha'nī kullah, lā ilāha illā ant.",
    "O Allah, it is Your mercy that I hope for, so do not leave me to myself even for the blink of an eye, and set right all my affairs. None has the right to be worshipped except You.",
    "Allow naxariistaada ayaan rajaynayaa, ee ha ii daynin naftayda xitaa il-biriqsi, arrimahayga oo dhanna ii hagaaji. Ilaah xaq lagu caabudo ma jiro adiga mooyee.",
    "Abu Dawud 5090")
add("worry-5", ["worry", "quran"], "The dua of Yunus", "Ducadii Nabi Yuunus",
    "لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
    "Lā ilāha illā anta subḥānaka innī kuntu minaẓ-ẓālimīn.",
    "None has the right to be worshipped except You. Glory be to You; I have been among the wrongdoers.",
    "Ilaah xaq lagu caabudo ma jiro adiga mooyee, waad nasahan tahay, anigu waxaan ka mid ahaa daalimiinta.",
    "Al-Anbiya 21:87, at-Tirmidhi 3505", 1,
    "No Muslim calls upon Allah with it for anything except that Allah answers him.")
add("worry-6", ["worry"], "Allah is my Lord", "Allaah waa Rabbigay",
    "اللَّهُ اللَّهُ رَبِّي لَا أُشْرِكُ بِهِ شَيْئًا",
    "Allāhu Allāhu rabbī lā ushriku bihi shay'ā.",
    "Allah, Allah is my Lord; I do not associate anything with Him.",
    "Allaah, Allaah waa Rabbigay, waxba lama wadaajiyo.",
    "Abu Dawud 1525")
add("worry-7", ["worry"], "When something is difficult", "Marka wax adkaadaan",
    "اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا",
    "Allāhumma lā sahla illā mā jaʿaltahu sahlā, wa anta tajʿalul-ḥazna idhā shi'ta sahlā.",
    "O Allah, nothing is easy except what You make easy, and You make the difficult easy if You will.",
    "Allow wax fudud ma jiro waxaad fududaysay mooyee, adiguna waad fududaysaa waxa adag haddaad doonto.",
    "Ibn Hibban 2427")

# ---------- Forgiveness ----------
add("forgive-1", ["forgiveness"], "The great istighfar", "Istighfaarka weyn",
    "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ",
    "Astaghfirullāhal-ʿaẓīmal-ladhī lā ilāha illā huwal-ḥayyal-qayyūma wa atūbu ilayh.",
    "I seek the forgiveness of Allah the Mighty, besides whom none has the right to be worshipped, the Ever-Living, the Sustainer, and I turn to Him in repentance.",
    "Waxaan dambi dhaaf weydiisanayaa Allaah ka weyn, ee aan ilaah xaq lagu caabudo jirin isaga mooyee, ka nool, ka wax walba haya, waanan u toobad keenayaa.",
    "Abu Dawud 1517, at-Tirmidhi 3577", 1,
    "He will be forgiven even if he had fled from the battlefield.")
add("forgive-2", ["forgiveness"], "My Lord, forgive me", "Rabbiyow ii dambi dhaaf",
    "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ",
    "Rabbighfir lī wa tub ʿalayya innaka antat-tawwābur-raḥīm.",
    "My Lord, forgive me and accept my repentance; You are the Accepter of repentance, the Most Merciful.",
    "Rabbiyow ii dambi dhaaf, toobaddaydana iga aqbal, adigaa ah ka toobadda aqbala, ka naxariista badan.",
    "Abu Dawud 1516, at-Tirmidhi 3434", 100,
    "The Prophet ﷺ was counted saying it one hundred times in a single sitting.")
add("forgive-3", ["forgiveness", "quran"], "The dua of Adam", "Ducadii Nabi Aadam",
    "رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
    "Rabbanā ẓalamnā anfusanā wa in lam taghfir lanā wa tarḥamnā lanakūnanna minal-khāsirīn.",
    "Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy on us, we will surely be among the losers.",
    "Rabbigayow nafteenna waan dulmannay, haddaanad noo dambi dhaafin oo noo naxariisan, waxaan ka mid noqon doonnaa kuwa khasaaray.",
    "Al-A'raf 7:23")
add("forgive-4", ["forgiveness"], "You love to pardon", "Cafiska waad jeceshahay",
    "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
    "Allāhumma innaka ʿafuwwun tuḥibbul-ʿafwa faʿfu ʿannī.",
    "O Allah, You are Pardoning and You love to pardon, so pardon me.",
    "Allow adigu waad cafis badan tahay, cafiskana waad jeceshahay, ee i cafi.",
    "At-Tirmidhi 3513, Ibn Majah 3850", 1,
    "The Prophet ﷺ taught it to Aishah for Laylat al-Qadr.")

# ---------- From the Qur'an ----------
add("quran-1", ["quran"], "Good in this world and the next", "Khayrka adduunka iyo aakhirada",
    "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    "Rabbanā ātinā fid-dunyā ḥasanatan wa fil-ākhirati ḥasanatan wa qinā ʿadhāban-nār.",
    "Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.",
    "Rabbigayow na sii adduunka wanaag, aakhiradana wanaag, nagana dhowr cadaabka naarta.",
    "Al-Baqarah 2:201", 1,
    "This was the dua the Prophet ﷺ made most often (al-Bukhari 6389).")
add("quran-2", ["quran"], "Keep our hearts firm", "Qalbiyadayada adkee",
    "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِنْ لَدُنْكَ رَحْمَةً إِنَّكَ أَنْتَ الْوَهَّابُ",
    "Rabbanā lā tuzigh qulūbanā baʿda idh hadaytanā wa hab lanā min ladunka raḥmah, innaka antal-wahhāb.",
    "Our Lord, do not let our hearts deviate after You have guided us, and grant us mercy from Yourself. You are the Bestower.",
    "Rabbigayow ha leexin qalbiyadayada kadib markaad na hanuunisay, naxariisna xaggaaga naga sii, adigaa ah Bixiyaha.",
    "Al Imran 3:8")
add("quran-3", ["quran"], "Increase me in knowledge", "Cilmi ii kordhi",
    "رَبِّ زِدْنِي عِلْمًا",
    "Rabbi zidnī ʿilmā.",
    "My Lord, increase me in knowledge.",
    "Rabbiyow cilmi ii kordhi.",
    "Ta-Ha 20:114")
add("quran-4", ["quran"], "For parents", "Ducada waalidka",
    "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
    "Rabbirḥamhumā kamā rabbayānī ṣaghīrā.",
    "My Lord, have mercy on them as they raised me when I was small.",
    "Rabbiyow u naxariiso sidii ay ii koriyeen anigoo yar.",
    "Al-Isra 17:24")
add("quran-5", ["quran"], "Forgiveness for me and my parents", "Dambi dhaaf aniga iyo waalidkay",
    "رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ",
    "Rabbanaghfir lī wa li-wālidayya wa lil-mu'minīna yawma yaqūmul-ḥisāb.",
    "Our Lord, forgive me, my parents and the believers on the Day the reckoning is established.",
    "Rabbigayow ii dambi dhaaf aniga, waalidkay iyo mu'miniinta, maalinta xisaabtu dhacayso.",
    "Ibrahim 14:41")
add("quran-6", ["quran"], "For family and children", "Ducada qoyska iyo carruurta",
    "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
    "Rabbanā hab lanā min azwājinā wa dhurriyyātinā qurrata aʿyunin wajʿalnā lil-muttaqīna imāmā.",
    "Our Lord, grant us from our spouses and children comfort to our eyes, and make us leaders for the righteous.",
    "Rabbigayow naga sii xaasaskeenna iyo carruurteenna qaboojinta indhaha, nagana dhig hoggaamiyeyaal u ah kuwa Ilaahay ka cabsada.",
    "Al-Furqan 25:74")

json.dump(duas, open(out_path, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(len(duas), "duas")
