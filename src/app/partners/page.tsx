"use client";
import React, { useState } from 'react';
import styles from './page.module.css';
import Image from 'next/image';

type Partner = {
  name: string;
  logo: string;
  shortDesc: string;
  fullDesc: string;
  country: string;
};

const fullPartnersData: Partner[] = [
    { 
      name: 'Satakunnan ammattikorkeakoulu', 
      logo: '/assets/images/C51E80F7-0E07-42E1-B917-481F0F107735_4_5005_c 2.png', 
      shortDesc: 'Satakunta University of Applied Sciences (SAMK) is a forward-looking, multidisciplinary higher education institution located on the west coast of Finland...',
      fullDesc: 'Satakunta University of Applied Sciences (SAMK) is a forward-looking, multidisciplinary higher education institution located on the west coast of Finland. With a strong focus on technology, business, health, and maritime education, SAMK is recognized for its practical teaching methods and close ties to industry.',
      country: 'Finland'
    },
    { 
      name: 'Windesheim University of Applied Sciences', 
      logo: '/assets/images/4104BB00-5A79-41B8-A44B-5BAC0921D397 1.png', 
      shortDesc: 'Windesheim University of Applied Sciences is a top‑3 Dutch institution known for its personal, practice‑oriented education...',
      fullDesc: 'Windesheim University of Applied Sciences is a top‑3 Dutch institution known for its personal, practice‑oriented education, strong ties with industry, and focus on sustainability and innovation.',
      country: 'Netherlands'
    },
    {
      name: 'Technische Hochschule Rosenheim',
      logo: '/assets/images/technische.png',
      shortDesc: 'Founded in 1971, Technische Hochschule Rosenheim is a leading University of Applied Sciences located in Bavaria, Germany...',
      fullDesc: 'Founded in 1971, Technische Hochschule Rosenheim is a leading University of Applied Sciences located in Bavaria, Germany. With over 6,400 students across multiple campuses—including Rosenheim, Burghausen, Mühldorf, and Chiemgau—the university offers 40+ bachelor’s and master’s programmes in fields like engineering, business, wood technology, health, and design. TH Rosenheim emphasizes close industry collaboration, real-world learning, and sustainability-driven research. Its well-equipped labs and research centres—such as the Energiezukunft Rosenheim and the roteg energy & building tech initiative—underpin its reputation as a practical innovation hub in the region.',
      country: 'Germany'
    },
    {
        name: 'Beykent Üniversitesi',
        logo: '/assets/images/Görüntü.png',
        shortDesc: 'Established in 1997, Beykent University is a private foundation university located in Istanbul, Türkiye...',
        fullDesc: 'Established in 1997, Beykent University is a private foundation university located in Istanbul, Türkiye. The university offers undergraduate, graduate, and doctoral programs across its faculties of engineering, economics, administrative sciences, fine arts, law, medicine, and communication. With its strong emphasis on international partnerships and digital innovation, Beykent actively supports interdisciplinary research, entrepreneurship, and sustainability-focused projects. The university’s modern campuses in Ayazağa, Beylikdüzü, and Taksim foster a dynamic academic environment. As a project partner in GT4T, Beykent University contributes through its strengths in tech-driven education and its growing network of research and innovation centers.',
        country: 'Türkiye'
      },
      {
        name: 'Griffith College',
        logo: '/assets/images/g16.png',
        shortDesc: 'Founded in 1974, Griffith College is Ireland’s largest independent third-level institution, operating campuses in Dublin, Cork and Limerick with nearly 8,000 students...',
        fullDesc: 'Founded in 1974, Griffith College is Ireland’s largest independent third-level institution, operating campuses in Dublin, Cork and Limerick with nearly 8,000 students, including over 1,400 internationals. Renowned for its professional, practice-led education in business, computing, law, media, and more, the college holds valuable accreditations such as QQI and ACCA. As a founding member of the DIVERSE University Alliance, Griffith College is committed to digital innovation, sustainability, and cross-border collaboration.',
        country: 'Ireland'
      },
      {
        name: 'Dublin Business Innovation Centre Limited LBG',
        logo: '/assets/images/dub.jpeg',
        shortDesc: 'Established in 1987, the Dublin Business Innovation Centre has been a cornerstone of Ireland’s startup ecosystem...',
        fullDesc: 'Established in 1987, the Dublin Business Innovation Centre has been a cornerstone of Ireland’s startup ecosystem. As part of EBN’s EU|BIC network, DBIC (branded as ‘Furthr’) provides game-changing consultancy, events, funding access, and incubation services to entrepreneurs in technology-led, knowledge-based sectors. To date, supported companies have collectively raised over €500 million in external finance, with more than 80 % securing third-party funding. DBIC also manages a premier incubator space at the Guinness Enterprise Centre and operates a venture capital arm, ‘Furthr VC’, to help scale promising deep-tech innovations.',
        country: 'Ireland'
      },
      {
        name: 'Ikigaia Oy',
        logo: '/assets/images/kk.png',
        shortDesc: 'Ikigaia Oy is a Helsinki‑based expert organization dedicated to turning science-driven ideas into scalable, sustainable businesses...',
        fullDesc: 'Ikigaia Oy is a Helsinki‑based expert organization dedicated to turning science-driven ideas into scalable, sustainable businesses. By bridging academia, industry, ecosystems, and capital, Ikigaia supports EU‑funded deep-tech initiatives—including GT4T—with strategic guidance, commercialization expertise, and capacity‑building. Their mission‑driven approach helps propel European green innovation from concept to real‑world impact.',
        country: 'Finland'
      },
      {
        name: 'Wild Campus GmbH',
        logo: '/assets/images/wddd.jpeg',
        shortDesc: 'Based in Rosenheim, Germany, Wild Campus GmbH develops future-oriented strategies, summer schools, and accelerator programmes tailored to universities, municipalities, and public institutions...',
        fullDesc: 'Based in Rosenheim, Germany, Wild Campus GmbH develops future-oriented strategies, summer schools, and accelerator programmes tailored to universities, municipalities, and public institutions. With extensive experience in entrepreneurship education, social innovation, and capacity building, they produce applied research, interactive workshops, and simulation games such as ‘Feel — Act — Change’. Their current portfolio includes summer 2024 events, conferences, and publications aimed at fostering social impact and sustainability in educational settings.',
        country: 'Germany'
      }
];

const associatedPartnersData: Partner[] = [
    {
        name: 'Satakunnan Biolaakso',
        logo: '/assets/images/bayrak/finland.jpeg',
        shortDesc: 'Launched in 2022 and led by Satakunta University of Applied Sciences, Satakunnan Biolaakso brings together local food producers, companies, and research centres to form a collaborative ecosystem. Focused on sustainable practices and circular bio‑economic solutions, it supports industry networking, knowledge exchange, joint R&D, and workforce development in the Satakunta region. The hub also organizes events, pilot projects, and provides free advisory services—such as biomethane feasibility studies—to strengthen regional agri‑food innovation and competitiveness.',
        fullDesc: 'Launched in 2022 and led by Satakunta University of Applied Sciences, Satakunnan Biolaakso brings together local food producers, companies, and research centres to form a collaborative ecosystem. Focused on sustainable practices and circular bio‑economic solutions, it supports industry networking, knowledge exchange, joint R&D, and workforce development in the Satakunta region. The hub also organizes events, pilot projects, and provides free advisory services—such as biomethane feasibility studies—to strengthen regional agri‑food innovation and competitiveness.',
        country: 'Finland'
      },
      {
        name: 'innFactory GmbH',
        logo: '/assets/images/bayrak/germany.jpeg',
        shortDesc: 'Based in Rosenheim, Germany, innFactory GmbH is a specialist innovation consultancy that helps universities, startups, and corporate partners collaborate on high-tech projects. Their tailored services include deep-tech accelerator programmes, startup scouting, and development frameworks designed to bridge research and commercialization. With networks across Europe and a hands-on approach, innFactory empowers GT4T partners to transform research-driven ideas into market-ready solutions.',
        fullDesc: 'Based in Rosenheim, Germany, innFactory GmbH is a specialist innovation consultancy that helps universities, startups, and corporate partners collaborate on high-tech projects. Their tailored services include deep-tech accelerator programmes, startup scouting, and development frameworks designed to bridge research and commercialization. With networks across Europe and a hands-on approach, innFactory empowers GT4T partners to transform research-driven ideas into market-ready solutions.',
        country: 'Germany'
      },
      {
        name: 'Stellwerk 19 - Digitale Wirtschaft Südostoberbayern e.V.',
        logo: '/assets/images/bayrak/germany.jpeg',
        shortDesc: 'Based in Rosenheim, Stellwerk 19 – Digitale Wirtschaft Südostoberbayern e.V. is a non-profit digital innovation cluster that connects small and medium-sized enterprises, startups, and academic partners to stimulate regional digital transformation. The network organises workshops, innovation sprints, and pilot projects on topics like digital manufacturing, IoT, AI, and smart services. Through collaborative initiatives and funding programmes, Stellwerk 19 strengthens Southeast Bavaria’s tech ecosystem and encourages sustainable, innovation-driven economic growth.',
        fullDesc: 'Based in Rosenheim, Stellwerk 19 – Digitale Wirtschaft Südostoberbayern e.V. is a non-profit digital innovation cluster that connects small and medium-sized enterprises, startups, and academic partners to stimulate regional digital transformation. The network organises workshops, innovation sprints, and pilot projects on topics like digital manufacturing, IoT, AI, and smart services. Through collaborative initiatives and funding programmes, Stellwerk 19 strengthens Southeast Bavaria’s tech ecosystem and encourages sustainable, innovation-driven economic growth.',
        country: 'Germany'
      },
      {
        name: 'DAIMIA',
        logo: '/assets/images/bayrak/turk.jpeg',
        shortDesc: 'Established in 2017 by a team of engineers, DAIMIA Bilişim ve Mühendislik Ltd. Şti. (DAIMIA Engineering IT Solutions) is headquartered in Istanbul and delivers bespoke CAD, CAM, PDM/PLM software and AI-powered digital solutions. Through strong collaborations with automotive R&D, it develops integrations and connectors between CAD systems and PLM platforms, alongside VR/AR tools and smart factory applications. DAIMIA also actively contributes to training engineers, enabling continuous professional development in areas like simulation, data management, and smart manufacturing.',
        fullDesc: 'Established in 2017 by a team of engineers, DAIMIA Bilişim ve Mühendislik Ltd. Şti. (DAIMIA Engineering IT Solutions) is headquartered in Istanbul and delivers bespoke CAD, CAM, PDM/PLM software and AI-powered digital solutions. Through strong collaborations with automotive R&D, it develops integrations and connectors between CAD systems and PLM platforms, alongside VR/AR tools and smart factory applications. DAIMIA also actively contributes to training engineers, enabling continuous professional development in areas like simulation, data management, and smart manufacturing.',
        country: 'Türkiye'
      },
      {
        name: 'Provence of Overijssel',
        logo: '/assets/images/bayrak/netherlends.jpeg',
        shortDesc: 'Overijssel is a province in the eastern Netherlands, known for its regional leadership in sustainable energy, agricultural innovation, and circular economy policies. With a population of approximately 1.18 million and major cities like Zwolle and Enschede, it has implemented pioneering initiatives such as the ‘Energiepact’ (energy pact) that targets substantial CO₂ emissions reductions through bio-energy, renewable energy infrastructure, and innovation partnerships with SMEs and municipalities. Through programmes like OP Oost and Innovation Partnerships, Overijssel actively supports green startups, decentralized biogas systems, and regional R&D collaborations, positioning itself as a sustainability gateway in the Netherlands.',
        fullDesc: 'Overijssel is a province in the eastern Netherlands, known for its regional leadership in sustainable energy, agricultural innovation, and circular economy policies. With a population of approximately 1.18 million and major cities like Zwolle and Enschede, it has implemented pioneering initiatives such as the ‘Energiepact’ (energy pact) that targets substantial CO₂ emissions reductions through bio-energy, renewable energy infrastructure, and innovation partnerships with SMEs and municipalities. Through programmes like OP Oost and Innovation Partnerships, Overijssel actively supports green startups, decentralized biogas systems, and regional R&D collaborations, positioning itself as a sustainability gateway in the Netherlands.',
        country: 'Netherlands'
      },
      {
        name: 'OostNL',
        logo: '/assets/images/bayrak/netherlends.jpeg',
        shortDesc: 'OostNL is the official regional development agency of the provinces of Overijssel and Gelderland in the Netherlands. Committed to economic development, OostNL invests in and supports startups, scaleups, and projects with a focus on green innovation, public-private collaboration, and sustainable growth. Their portfolio includes smart energy projects, circular economy initiatives, health-tech and agritech ventures, and international business development services. Through funding programmes, strategic partnerships, and ecosystem building, OostNL aims to create impact and long-term prosperity in the Eastern Netherlands region.',
        fullDesc: 'OostNL is the official regional development agency of the provinces of Overijssel and Gelderland in the Netherlands. Committed to economic development, OostNL invests in and supports startups, scaleups, and projects with a focus on green innovation, public-private collaboration, and sustainable growth. Their portfolio includes smart energy projects, circular economy initiatives, health-tech and agritech ventures, and international business development services. Through funding programmes, strategic partnerships, and ecosystem building, OostNL aims to create impact and long-term prosperity in the Eastern Netherlands region.',
        country: 'Netherlands'
      },
      {
        name: 'Network Ireland',
        logo: '/assets/images/bayrak/ireland.jpeg',
        shortDesc: 'Founded in 1983, Network Ireland now has over 1,300 members across 17 branches nationwide, supporting women entrepreneurs, SME owners, professionals, and leaders in non-profits, arts, and public sectors. The organisation hosts networking events, mentorship programmes, and business awards to promote equality, leadership development, and entrepreneurship. By connecting like-minded women, Network Ireland fosters professional growth, confidence, and collaborative partnerships across Ireland.',
        fullDesc: 'Founded in 1983, Network Ireland now has over 1,300 members across 17 branches nationwide, supporting women entrepreneurs, SME owners, professionals, and leaders in non-profits, arts, and public sectors. The organisation hosts networking events, mentorship programmes, and business awards to promote equality, leadership development, and entrepreneurship. By connecting like-minded women, Network Ireland fosters professional growth, confidence, and collaborative partnerships across Ireland.',
        country: 'Ireland'
      },
      {
        name: 'Huvilatohtorit',
        logo: '/assets/images/bayrak/finland.jpeg',
        shortDesc: 'Huvilatohtorit, based in Finland, acts as a regional knowledge and training hub for higher education and professional development. The organisation supports collaborative research initiatives, capacity-building workshops, and community-led innovation projects. Emphasising practical learning and networking, Huvilatohtorit bridges the gap between academia, industry, and local communities to promote sustainable and inclusive innovation.',
        fullDesc: 'Huvilatohtorit, based in Finland, acts as a regional knowledge and training hub for higher education and professional development. The organisation supports collaborative research initiatives, capacity-building workshops, and community-led innovation projects. Emphasising practical learning and networking, Huvilatohtorit bridges the gap between academia, industry, and local communities to promote sustainable and inclusive innovation.',
        country: 'Finland'
      },
      {
        name: 'Aaltoni Oy',
        logo: '/assets/images/bayrak/finland.jpeg',
        shortDesc: 'Aaltoni Oy is a Finland-based consultancy offering administrative and business support services, with a particular focus on research and development projects. Acting as a key associated partner in GT4T, the company helps streamline project coordination, grant applications, and stakeholder engagement. With roots in the Varsinais-Suomi region, Aaltoni brings local expertise and operational excellence to enhance the consortium’s effectiveness and impact.',
        fullDesc: 'Aaltoni Oy is a Finland-based consultancy offering administrative and business support services, with a particular focus on research and development projects. Acting as a key associated partner in GT4T, the company helps streamline project coordination, grant applications, and stakeholder engagement. With roots in the Varsinais-Suomi region, Aaltoni brings local expertise and operational excellence to enhance the consortium’s effectiveness and impact.',
        country: 'Finland'
      },
      {
        name: 'BVNO',
        logo: '/assets/images/bayrak/netherlends.jpeg',
        shortDesc: 'BVNO (Besloten Vennootschap Netherlands Organization) serves as a national association advocating for Dutch private limited companies (bv). The organization provides representation at both national and EU levels, supports members with legal, regulatory, and corporate governance guidance, and promotes entrepreneurship and business growth. BVNO also hosts workshops, networking events, and publishes resources to help companies navigate regulatory requirements, funding opportunities, and sustainable business practices under Dutch law.',
        fullDesc: 'BVNO (Besloten Vennootschap Netherlands Organization) serves as a national association advocating for Dutch private limited companies (bv). The organization provides representation at both national and EU levels, supports members with legal, regulatory, and corporate governance guidance, and promotes entrepreneurship and business growth. BVNO also hosts workshops, networking events, and publishes resources to help companies navigate regulatory requirements, funding opportunities, and sustainable business practices under Dutch law.',
        country: 'Netherlands'
      }
];



const PartnerCard = ({ partner }: { partner: Partner }) => {
    const [isExpanded, setIsExpanded] = useState(false);
  
    return (
      <article className={styles.partnerCard}>
        <div className={styles.imageContainer}>
          <Image 
            src={partner.logo} 
            alt={`${partner.name} Logo`} 
            width={300} 
            height={200}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className={styles.contentContainer}>
          <h2 className={styles.partnerName}>{partner.name}</h2>
          <div className={`${styles.descWrapper} ${isExpanded ? styles.expanded : ''}`}>
            <p>{partner.fullDesc}</p>
          </div>
          <div className={styles.footer}>
            <span className={styles.countryTag}>{partner.country}</span>
            <button onClick={() => setIsExpanded(!isExpanded)} className={styles.readMoreBtn}>
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>
          </div>
        </div>
      </article>
    );
};
  

const PartnersPage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Full Partners</h1>
      </header>
      <main className={styles.partnersList}>
        {fullPartnersData.map((partner, index) => (
          <PartnerCard key={`full-${index}`} partner={partner} />
        ))}
      </main>

      <header className={`${styles.header} ${styles.associatedHeader}`}>
        <h1>Associated Partners</h1>
      </header>
      <main className={styles.partnersList}>
        {associatedPartnersData.map((partner, index) => (
          <PartnerCard key={`assoc-${index}`} partner={partner} />
        ))}
      </main>
    </div>
  );
};

export default PartnersPage; 