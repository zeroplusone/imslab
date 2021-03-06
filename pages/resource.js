import React from 'react';
import PropTypes from 'prop-types';
import {Table} from 'react-bootstrap';
import {withRouter} from 'next/router';
import Layout from '../components/layout';
import Markdown from 'react-markdown';
import Block from '../components/block';

import '../scss/layout.scss';
import dataEn from '../data/en/resource.json';
import dataTw from '../data/zh-TW/resource.json';
import confDataJson from '../data/conference.json';

const getDocContent = (data) => `
### 3GPP LTE/LTE-Adv
- [3G and 4G Wireless Blog](http://blog.3g4g.co.uk/)
- [4G-Portal](http://4g-portal.com/)

---

### ${data.doc_subtitle2}
- [${data.doc_list2_1}](http://www.motc.gov.tw/post/home.jsp?id=364&parentpath=0)
- [${data.doc_list2_2}](http://freqdbo.ncc.gov.tw/Portal/index.aspx)
- [${data.doc_list2_3}](http://freqdbo.ncc.gov.tw/upload/FILESAVE/080724081215.pdf)

---

### ${data.doc_subtitle3}
- [${data.doc_list3_1}](http://ocw.aca.ntu.edu.tw/ntu-ocw/)
- [${data.doc_list3_2}](http://ocw.nctu.edu.tw/)
- [${data.doc_list3_3}](http://ocw.nthu.edu.tw/ocw/)
`;

const getJourContent = () => `
- IEEE Wireless Communications Magazine
- IEEE Communications Magazine        
- IEEE Network
- IEEE Communications Letter
- IEEE Journal on Selected Areas in Communications
- IEEE Transactions on Mobile Computing
- IEEE Transactions on Wireless Communications`;

const getConfContent = () => {
  const confData = {...confDataJson};
  const confElms = [];
  const openLink = (e) => window.open(e.currentTarget.dataset.href);
  Object.entries(confData).forEach(([key, subData], index) =>
    confElms.push(subData.map((d, i) => (
      <tr key={`${key}-${i}`}
        className={index % 2 === 0 ? 'row-inverse' : 'row-default'}
        onClick={openLink}
        data-href={d.link}>
        {!i && <td className='td-title' rowSpan={subData.length}>{key}</td>}
        <td>{d.date}</td>
        <td>{d.place}</td>
        <td className={d.due ? 'deleted' : 'highlight'}>{d.deadline}</td>
      </tr>
    ))));
  return (
    <Table responsive>
      <thead className="thead-inverse"><tr>
        <th>Conference</th>
        <th>Date</th>
        <th>Place</th>
        <th>Submission Deadline</th>
      </tr></thead>
      <tbody>
        {confElms}
      </tbody>
    </Table>
  );
};

const getBlogContent = () => `
- [林一平部落格](http://blog.bs2.to/liny)
- [教書匠的夢想](http://blog.xuite.net/ycedu/blog)
- [清大彭明輝的部落格](http://mhperng.blogspot.com/)
- [vgod's blog](http://blog.vgod.tw/)`;

const getApplyContent = () => `
### 出國參加研討會補助
- [傑出人才發展基金會](http://www.faos.org.tw/Application/index.asp)

---

### 碩博士論文獎
- [中華民國資訊學會 碩博士最佳論文獎](http://www.iicm.org.tw/) (Deadline: 8/15)
- [中國電機工程學會 青年論文獎](http://www.ciee.org.tw/) (Deadline: 8/1)
- [台灣電機電子工程學會 最佳博碩士論文獎](https://sites.google.com/site/tieeeorg/Home) (Deadline: 8/31)

---

### 大學生可申請獎項
- [國科會大專學生研究計畫](http://web1.nsc.gov.tw/lp.aspx?CtNode=343&CtUnit=488&BaseDSD=5&mp=1) (Deadline: 二月中)
- [中國工程師學會 優秀工程學生獎學金](http://www.cie.org.tw/awards_selection_detail.php?id=11) (Deadline: 3/15)
- [中國工程師學會 學生分會 工程論文競賽](http://www.cie.org.tw/news_detail.php?id=33)

---

### 比賽
- [Google Summer of Code](http://summerofcode.withgoogle.com/about/) (Deadline: 四月初)
- [經濟部 搶鮮大賽](http://www.getfresh.org.tw/index.aspx) (Deadline: 五月中)
- [中華電信 電信創新應用大賽](http://telsoft.hinet.net/) (Deadline: 八月初)
- [經濟部工業局 通訊大賽](http://www.mobilehero.com/) (Deadline: 九月初)
- [經濟部工業局 資訊應用服務創新競賽](http://innoserve.tca.org.tw/) (Deadline: 十月中)
- [教育部 大學校院網路通訊軟體與創意應用競賽](http://ncsiac.csie.ncu.edu.tw/) (Deadline: 十一月底)

---

### 其他
- [成功大學獎學金查詢](http://sgd.adm.ncku.edu.tw/scholarship/)
- [救國團 青年節表揚大專優秀青年](http://associations.cyc.org.tw/) (Deadline: 3/15)
`;

const Resource = ({router}) => {
  const title = router.query.title;
  const lang = router.query.lang || 'zh-tw';
  const data = lang === 'en' ? dataEn : dataTw;
  let blocks = [
    <Block title={data.doc_title} key='doc' ref={React.createRef()}>
      <Markdown source={getDocContent(data)} linkTarget='_blank' />
    </Block>,
    <Block title={data.jour_title} key='jour' ref={React.createRef()}>
      <Markdown source={getJourContent()} />
    </Block>,
    <Block title={data.conf_title} key='conf' ref={React.createRef()}>
      {getConfContent()}
    </Block>,
  ];
  if (lang !== 'en') {
    blocks = [...blocks,
      <Block title="推薦部落格" key='blog' ref={React.createRef()}>
        <Markdown source={getBlogContent()} linkTarget='_blank' />
      </Block>,
      <Block title="可申請獎項" key='apply' ref={React.createRef()}>
        <Markdown source={getApplyContent()} linkTarget='_blank' />
      </Block>,
    ];
  }
  return <Layout id="resource-container" pathname={router.asPath} blocks={blocks} lang={lang} title={title} />;
};
Resource.propTypes = {router: PropTypes.object.isRequired};

export default withRouter(Resource);
