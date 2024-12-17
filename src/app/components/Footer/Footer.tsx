'use client';
import {
  AccordionDetails,
  AccordionSummary,
  useMediaQuery,
  Accordion,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link';

import Web10Icon from './white-logo.svg';
import Facebook from './facebook.svg';
import LinkedIn from './linkedin.svg';
import Twitter from './twitter.svg';
import YouTube from './youtube.svg';
import Slack from './slack.svg';

import styles from './footer.module.scss';

const LINK_GROUPS = [
  {
    links: [
      {
        href: 'https://10web.io/about-us/?_gl=1*nnlrg5*_ga*MTc0MDUwNTQ3MC4xNzE0MTIyMTQ5*_ga_2J827PZZKP*MTcxNDc1MjY2MS4yLjAuMTcxNDc1MjY2NS4wLjAuMjIyMTExNjI1*_fplc*VjNDVENwME5RQlJ0JTJGdWtad2t6VkxOb25Yb3lLamslMkZvV1JENjlyaU9TdGJZN2tSSkF4QnNZUFVsWEFIcHFzM1JBQ2tFenRFMTdkMGNxU0VqJTJCUEElMkZhYkNUbU9VVlk1TTJ5WEFRejZCMjhkbTV3OFRxUiUyQm1XUmFvcktHS0pjZyUzRCUzRA..',
        name: 'About us',
      },
      {
        href: 'https://10web.io/customer-care-support/',
        name: 'Contact us',
      },
      {
        href: 'https://10web.io/security-statement/',
        name: 'Security statement',
      },
      {
        href: 'https://10web.io/affiliates/',
        name: 'Affiliiates',
      },
      {
        href: 'https://10web.io/affiliate-terms-and-conditions/',
        name: 'Affiliate terms',
      },
      {
        href: 'https://jobs.10web.io/',
        name: 'Career',
      },
      {
        href: 'https://10web.io/pricing/',
        name: 'Pricing',
      },
    ],
    title: 'Company',
  },
  {
    links: [
      {
        href: 'https://10web.io/ai-website-builder/',
        name: 'AI Website Builder',
      },
      {
        href: 'https://10web.io/ai-ecommerce-website-builder/',
        name: 'AI Ecommerce',
      },
      {
        href: 'https://10web.io/managed-wordpress-hosting/',
        name: 'Hosting',
      },
      {
        href: 'https://10web.io/page-speed-booster/',
        name: 'PageSpeed Booster',
      },
      {
        href: 'https://10web.io/ai-business-name-generator/',
        name: 'AI Business Name Generator',
      },
      {
        href: 'https://10web.io/industries/',
        name: 'Industries',
      },
      {
        href: 'https://10web.io/ai-writing-assistant/',
        name: 'AI Assistant',
      },
      {
        name: 'AI Marketing Strategy Generator',
        href: 'https://10web.io/ai-marketing/',
      },
      {
        href: 'https://10web.io/wordpress-plugins/',
        name: 'Plugins',
      },
      {
        href: 'https://10web.io/widgets/',
        name: 'Widgets',
      },
      {
        href: 'https://10web.io/automated-website-management/',
        name: 'Website management',
      },
    ],
    title: 'Product',
  },
  {
    links: [
      {
        href: 'https://10web.io/ai-wordpress-platform-for-agencies-and-freelancers/?_gl=1*11lwfy9*_ga*MTc0MDUwNTQ3MC4xNzE0MTIyMTQ5*_ga_2J827PZZKP*MTcxNDc1MjY2MS4yLjEuMTcxNDc1Mjc2NC4wLjAuMjIyMTExNjI1*_fplc*YVN1OVAzTEJmUFl5YldpdEVvM0FkenVPNE9zUW9ScVgyV0ZBU2FXeWc4WSUyQmxqWXlFTG9rOTB4WkZKbGlvYTZJd3FyVlJjbFFDa294Q1dGMUk4NDlYbHZIc3NJJTJGNmtLRnZiYU5oTWMyQWJhYWVBRjJESUE4blIyN3liSFhkZyUzRCUzRA..',
        name: '10Web for agencies & freelancers',
      },
      {
        href: 'https://10web.io/case-studies/',
        name: 'Case studies',
      },
      {
        href: 'https://10web.io/ai-powered-wordpress-platform-for-smbs/?_gl=1*11lwfy9*_ga*MTc0MDUwNTQ3MC4xNzE0MTIyMTQ5*_ga_2J827PZZKP*MTcxNDc1MjY2MS4yLjEuMTcxNDc1Mjc2NC4wLjAuMjIyMTExNjI1*_fplc*YVN1OVAzTEJmUFl5YldpdEVvM0FkenVPNE9zUW9ScVgyV0ZBU2FXeWc4WSUyQmxqWXlFTG9rOTB4WkZKbGlvYTZJd3FyVlJjbFFDa294Q1dGMUk4NDlYbHZIc3NJJTJGNmtLRnZiYU5oTWMyQWJhYWVBRjJESUE4blIyN3liSFhkZyUzRCUzRA..',
        name: '10Web for SMBs',
      },
      {
        href: 'https://10web.io/reviews/?_gl=1*11lwfy9*_ga*MTc0MDUwNTQ3MC4xNzE0MTIyMTQ5*_ga_2J827PZZKP*MTcxNDc1MjY2MS4yLjEuMTcxNDc1Mjc2NC4wLjAuMjIyMTExNjI1*_fplc*YVN1OVAzTEJmUFl5YldpdEVvM0FkenVPNE9zUW9ScVgyV0ZBU2FXeWc4WSUyQmxqWXlFTG9rOTB4WkZKbGlvYTZJd3FyVlJjbFFDa294Q1dGMUk4NDlYbHZIc3NJJTJGNmtLRnZiYU5oTWMyQWJhYWVBRjJESUE4blIyN3liSFhkZyUzRCUzRA..',
        name: 'Customer reviews',
      },
    ],
    title: 'Customers',
  },
  {
    links: [
      {
        href: 'https://help.10web.io/hc/en-us/',
        name: 'Help Center',
      },
      {
        href: 'https://10web.io/blog',
        name: 'Blog',
      },
      {
        href: 'https://10web.io/wordpress-hosting-glossary/?_gl=1*owqbh9*_ga*MTc0MDUwNTQ3MC4xNzE0MTIyMTQ5*_ga_2J827PZZKP*MTcxNDc1MjY2MS4yLjEuMTcxNDc1Mjc2NC4wLjAuMjIyMTExNjI1*_fplc*YVN1OVAzTEJmUFl5YldpdEVvM0FkenVPNE9zUW9ScVgyV0ZBU2FXeWc4WSUyQmxqWXlFTG9rOTB4WkZKbGlvYTZJd3FyVlJjbFFDa294Q1dGMUk4NDlYbHZIc3NJJTJGNmtLRnZiYU5oTWMyQWJhYWVBRjJESUE4blIyN3liSFhkZyUzRCUzRA..',
        name: 'Hosting glossary',
      },
      {
        href: 'https://10web.io/site-speed-glossary/',
        name: 'Site speed glossary',
      },
      {
        href: 'https://10web.io/press-kit/',
        name: 'Press Kit',
      },
      {
        href: 'https://help.10web.io/hc/en-us/articles/360028017772-Public-roadmap',
        name: 'Roadmap',
      },
      {
        href: 'https://help.10web.io/hc/en-us/community/topics',
        name: 'Submit your idea',
      },
      {
        href: 'https://www.facebook.com/groups/356970164992808/',
        name: 'Facebook community',
      },
      {
        href: 'https://10web.io/technology/',
        name: 'AI technology',
      },
      {
        href: 'https://status.10web.io/',
        name: 'System status',
      },
    ],
    title: 'Resources',
  },
];

export function Footer() {
  const middleScreen = useMediaQuery('(max-width:1260px)');
  return (
    <div className={styles.footer}>
      <div className={styles.content}>
        <div>
          <Web10Icon className={styles.logo} />
          <p className={styles.mainInfo}>TenWeb, Inc.</p>
          <p className={styles.mainInfo}>40 E Main St, Suite 721</p>
          <p className={styles.mainInfo}>Newark, DE 19711</p>
          <p className={styles.mainInfo}>United States</p>
        </div>
        <div className={styles.links}>
          {LINK_GROUPS.map((linkGroup) => {
            return middleScreen ? (
              <>
                <div className={styles.line}></div>
                <Accordion
                  sx={{
                    '& .MuiAccordionSummary-root': {
                      padding: '8px 0 !important',
                      background: 'black',
                      color: 'white',
                      // margin:'20px 0 !important',
                    },
                    '& .MuiAccordionDetails-root': {
                      background: 'black',
                      color: '#FFFFFF80',
                      padding: '0',
                    },
                    '& .MuiSvgIcon-root': {
                      fill: '#FFFFFF80',
                    },
                    '& .MuiTableCell-root': {
                      border: 'none',
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon fill={'white'} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    {linkGroup.title}
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className={styles.link_group}>
                      {linkGroup.links.map((link) => (
                        <Link
                          className={styles.link}
                          href={link.href}
                          key={link.name}
                          target="_blank"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </AccordionDetails>
                </Accordion>
              </>
            ) : (
              <div className={styles.linkGroup} key={linkGroup.title}>
                <p className={styles.groupTitle}>{linkGroup.title}</p>
                {linkGroup.links.map((link) => (
                  <Link
                    className={styles.link}
                    href={link.href}
                    key={link.name}
                    target="_blank"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.bottom}>
        <p className={styles.copyright}>
          Copyright © {new Date().getFullYear()} TenWeb. All rights reserved.
        </p>
        <div className={styles.link_ctn}>
          <Link
            href="https://10web.io/privacy-policy/"
            className={styles.bottomLink}
          >
            Privacy
          </Link>
          <div className={styles.dot} />
          <Link
            href="https://10web.io/terms-of-service/"
            className={styles.bottomLink}
          >
            Terms of Service
          </Link>
          <div className={styles.dot} />
          <Link
            href="https://10web.io/service-level-agreement/"
            className={styles.bottomLink}
          >
            SLA
          </Link>
          <div className={styles.dot} />
          <Link href="https://10web.io/abuse/" className={styles.bottomLink}>
            Report Abuse
          </Link>
        </div>
        <div className={styles.socialGroup}>
          <Link
            href="https://join.slack.com/t/10webexperts/shared_invite/zt-1fx3ih612-astlsCmwDIGxO2cd1TzEMA"
            className={styles.social}
          >
            <Slack />
          </Link>
          <Link href="https://twitter.com/10Web_io" className={styles.social}>
            <Twitter />
          </Link>
          <Link
            href="https://www.youtube.com/c/10Web"
            className={styles.social}
          >
            <YouTube />
          </Link>
          <Link
            href="https://www.facebook.com/10Web.io/"
            className={styles.social}
          >
            <Facebook />
          </Link>
          <Link
            href="https://www.linkedin.com/company/10web/"
            className={styles.social}
          >
            <LinkedIn />
          </Link>
        </div>
      </div>
    </div>
  );
}
