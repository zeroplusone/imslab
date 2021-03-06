import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'next/router';
import Layout from '../components/layout';
import Markdown from 'react-markdown';
import Block from '../components/block';

import '../scss/layout.scss';
import dataEn from '../data/en/research.json';
import dataTw from '../data/zh-TW/research.json';
import projData from '../data/projects.json';

const getTopicContent = (data) => `
## ${data.des1_1} ${data.des1_2}

### ${data.subtitle1_1}
- Software Defined Network (SDN) and Network Function Virtualization (NFV) (軟體定義網路/網路功能虛擬化)
- Machine-to-Machine (M2M) Communication / Machine-type Communication (MTC) (機器類型通訊)
- Local IP Access (LIPA)
- Device-to-Device (D2D) Communication
- Cloud Radio Access Network (C-RAN)
- Narrow Band IoT (NBIoT)

---

### ${data.subtitle1_2}
- enhanced Inter-Cell Interference Coordination (eICIC)
- Positioning Methods in Cellular Network (行動定位技術)
- Emergency Communications (緊急通訊技術)
- System Design for Telecom-grade Information System (電信企業等級資訊系統設計)
- IP Multimedia Subsystem (IMS; IP 多媒體子系統)
- Voice Call Continuity (VCC; 語音通話連續性)
`;

const getProjContent = (data, lang) => {
  const {current, past} = projData;
  const buildList = (d) => `
1. ${data.proj_name}-${lang && d.name_en ? d.name_en : d.name}  
  ${data.proj_dur}-${d.duration}  
  ${data.proj_sponsor}-${lang && d.subsidy_en ? d.subsidy_en : d.subsidy}
`;

  let res = '';
  if (current) {
    res += `## ${data.subtitle2_1} \n`;
    if (current.independent) {
      res += `### ${data.PI}`;
      res += current.independent.map(buildList).join('');
    }
    if (current.cooperation) {
      res += `### ${data.co_PI} \n`;
      res += current.cooperation.map(buildList).join('');
    }
    res += `\n---\n`;
  }
  if (past) {
    res += `## ${data.subtitle2_2} \n`;
    if (past.independent) {
      res += `### ${data.PI}`;
      res += past.independent.map(buildList).join('');
    }
    if (past.cooperation) {
      res += `### ${data.co_PI} \n`;
      res += past.cooperation.map(buildList).join('');
    }
  }
  return res;
};

const Research = ({router}) => {
  const title = router.query.title;
  const lang = router.query.lang || 'zh-tw';
  const data = lang === 'en' ? dataEn : dataTw;
  const blocks = [
    <Block title={data.head1} key={data.head1} ref={React.createRef()}>
      <Markdown source={getTopicContent(data)} />
    </Block>,
    <Block title={data.head2} id='project' key='project' ref={React.createRef()}>
      <Markdown source={getProjContent(data, lang)} />
    </Block>,
  ];
  return <Layout id='research-container' pathname={router.asPath} lang={lang} blocks={blocks} title={title} />;
};
Research.propTypes = {router: PropTypes.object.isRequired};

export default withRouter(Research);
