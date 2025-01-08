'use client';
import {
  AccordionDetails,
  AccordionSummary,
  useMediaQuery,
  Accordion,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link';
import Twitter from './twitter.svg';
import { FaSlack,  FaYoutube,FaFacebook,FaLinkedin} from "react-icons/fa";
import styles from './footer.module.scss';

const LINK_GROUPS = [
  {
    links:
        {
          row1: {
              title: 'AI BUILDER',
              data: [
                  {
                      href: 'https://10web.io/ai-website-builder/',
                      name: 'AI Website Builder',
                  },
                  {
                      href: 'https://10web.io/ai-ecommerce-website-builder/',
                      name: 'Ecommerce AI Builder',
                  },
                  {
                      href: 'https://10web.io/wordpress-ai-builder/',
                      name: 'WordPress AI Builder'
                  },
              ],
          },
          row2:{
              data: [
                  {
                      href: 'https://10web.io/managed-wordpress-hosting/',
                      name: 'Managed WordPress Hosting',
                  },
                  {
                      href: 'https://10web.io/dedicated-hosting/',
                      name: 'Dedicated WordPress Hosting',
                  },
                  {
                      href: 'https://10web.io/vps-hosting/',
                      name: 'WordPress VPS Hosting',
                  },
                  {
                      href: 'https://10web.io/buddyboss-hosting/',
                      name: 'BuddyBoss Hosting',
                  },

              ],
              title:'PRODUCT'
          }
        },
  },
  {
    links:
        {
          row1:
              {
                  title:'WORDPRESS TOOLS',
                  data:[
                      {
                          href: 'https://10web.io/page-speed-booster/',
                          name: 'PageSpeed Booster',
                      },
                      {
                          href: 'https://10web.io/plugins/',
                          name: 'WordPress Plugins',
                      }
                  ]
              },
          row2:
              {
                  title:'BUSINESS TOOLS',
                  data:[
                      {
                          href: 'https://10web.io/ai-business-name-generator/',
                          name: 'AI Business Name Generator',
                      },
                      {
                          href: 'https://10web.io/domain-name/',
                          name: 'Free Custom Domain',
                      },
                      {
                          href: 'https://10web.io/tools/slogan-generator/',
                          name: 'Slogan Generator',
                      },
                      {
                          href: 'https://10web.io/ai-seo/',
                          name: 'AI SEO Keyword Generator',
                      },
                      {
                          href: 'https://10web.io/ai-website-builder/industries/',
                          name: 'Industry Explorer',
                      },
                  ]
              }
        },
  },
  {
    links:
        {
          row1:
              {
                  title:'RESOURCES',
                  data:[
                      {
                          href: 'https://10web.io/blog/',
                          name: 'Blog',
                      },
                      {
                          href: 'https://10web.io/case-studies/',
                          name: 'Case Studies',
                      },
                      {
                          href: 'https://10web.io/wordpress-glossary/',
                          name: 'Glossaries'
                      },
                      {
                          href: 'https://10web.io/builder-comparisons/',
                          name: 'Website Builder Comparisons',
                      },
                      {
                          href: 'https://10web.io/hosting-comparisons/',
                          name: 'Hosting Comparisons',
                      },
                      {
                          href: 'https://10web.io/wordpress-plugins/',
                          name: 'WordPress Plugins Repository',
                      },
                      {
                          href: 'https://10web.io/ai-tools/',
                          name: 'AI Tools Repository'
                      },
                      {
                          href: 'https://10web.io/ai-simplified-newsletter/',
                          name: 'AI Simplified Newsletter',
                      },
                      {
                          href: 'https://10web.io/press-kit/',
                          name: 'Press Kit',
                      },
                      {
                          href: 'https://help.10web.io/hc/en-us/articles/360028017772-10Web-Public-Roadmap?_gl=1%2A1o3ipwm%2A_gcl_au%2AMTU5MzY4MjM3NC4xNzM0MDg2NDYy%2AFPAU%2AMTMxOTk4MjU1LjE3MzQwODYyNzI.%2A_ga%2AMTcyNjcwNzA5OC4xNzM0MDg2NDYy%2A_ga_2J827PZZKP%2AMTczNjI1MzY2NC4xMS4xLjE3MzYyNTQ4NDMuMC4wLjk5Njk5MzAxNQ..%2A_fplc%2ARUdudGhBTjV2NHdld3J3U2tmZU5DZWlzaGZhQXlYSHI4NyUyQiUyQktUV0M4aDBKd0tGWU9kWVVncDIlMkZGdFdQcENSS0lnVnUyODBiJTJCTFlWTzJiM1BGTDFtRG9zdFdoMSUyRkZyNHJ1cVFDOVp6N0R5cmh4WjBUenJzUGlURW1CYklidyUzRCUzRA../',
                          name: 'Public Roadmap',
                      },
                      {
                          href: 'https://help.10web.io/hc/en-us?_gl=1*xzh9qi*_gcl_au*MTU5MzY4MjM3NC4xNzM0MDg2NDYy*FPAU*MTMxOTk4MjU1LjE3MzQwODYyNzI.*_ga*MTcyNjcwNzA5OC4xNzM0MDg2NDYy*_ga_2J827PZZKP*MTczNjI1MzY2NC4xMS4xLjE3MzYyNTQ4NDcuMC4wLjk5Njk5MzAxNQ..*_fplc*NmRQajJjeERCT2JlNld5ajBjYmVQVVFzck1oU2xGcEc2OG1wTjElMkZIdHA3SE5oNmlINyUyRlJKRUtBZkJKZW1JRlBYaEZEY3haZTdiNFp6ZGpoRjJsbHhBTEFPOGdRMXE2MkRCYTdIYVR1a3M5ejMlMkYlMkJXaTBRQzFwemVSd1hEemclM0QlM0Q./',
                          name: 'Help Center',
                      },
                      {
                          href: 'https://help.10web.io/hc/en-us/community/topics?_gl=1*ti2dgl*_gcl_au*MTU5MzY4MjM3NC4xNzM0MDg2NDYy*FPAU*MTMxOTk4MjU1LjE3MzQwODYyNzI.*_ga*MTcyNjcwNzA5OC4xNzM0MDg2NDYy*_ga_2J827PZZKP*MTczNjI1MzY2NC4xMS4xLjE3MzYyNTQ4NzguMC4wLjk5Njk5MzAxNQ..*_fplc*c2JtUENWSHlzRm8yOFluMGxTRUJTQmpkJTJGNWN4d0s1bHhORVNwRW9zTjJnN3hZMFd3eUdBQiUyRmMlMkI1Q0p5YjlKcE5Zb1klMkJQNEVTYW9YR0l6dSUyQlhOMCUyQmp6ODJFZ21LSHhheUpZZUNIWmZlam9QU1o3TFptelpEUEdla1dVcFlBJTNEJTNE/',
                          name: 'Submit Your Idea',
                      },
                  ]
              }
        },
  },
  {
    links:
        {
          row1:
              {
                  title:'COMPANY',
                  data:[
                      {
                          href: 'https://10web.io/ai-website-builder/',
                          name: 'About Us',
                      },
                      {
                          href: 'https://10web.io/ai-ecommerce-website-builder/',
                          name: 'Affiliates',
                      },
                      {
                          href: 'https://10web.io/wordpress-ai-builder/',
                          name: 'Careers'
                      },
                      {
                          href: 'https://10web.io/managed-wordpress-hosting/',
                          name: 'Contact Us',
                      },
                      {
                          href: 'https://10web.io/dedicated-hosting/',
                          name: 'Pricing',
                      },
                      {
                          href: 'https://10web.io/vps-hosting/',
                          name: 'Report Abuse',
                      },
                      {
                          href: 'https://10web.io/buddyboss-hosting/',
                          name: 'System Status',
                      },
                      {
                          href: 'https://10web.io/buddyboss-hosting/',
                          name: 'Legal and compliance center',
                      },
                  ]
              }
        },
  },
];

export function Footer() {
  const middleScreen = useMediaQuery('(max-width:1260px)');
  return (
    <div className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.links}>
            {LINK_GROUPS.map((linkGroup, index) => {
                return middleScreen ? (
                    <>
                        {Object.keys(linkGroup.links).map((rowKey) => {
                            const row = linkGroup.links[rowKey as keyof typeof linkGroup.links];
                            return (
                                <Accordion
                                    key={`${index}-${rowKey}`}
                                    sx={{
                                        '& .MuiAccordionSummary-root': {
                                            padding: '0 !important',
                                            background: 'black',
                                            color: 'white',
                                            margin:'-1px',
                                        },
                                        '& .MuiAccordionDetails-root': {
                                            background: 'black',
                                            color: '#FFFFFF80',
                                            padding: '0',
                                            margin: '-1px',
                                        },
                                        '& .MuiSvgIcon-root': {
                                            fill: 'white',
                                        },
                                        '& .MuiTableCell-root': {
                                            border: 'none',
                                        },
                                    }}
                                >
                                    <AccordionSummary
                                        className={styles.link}
                                        expandIcon={<ExpandMoreIcon fill={'white'} />}
                                        aria-controls={`${rowKey}-content`}
                                        id={`${rowKey}-header`}
                                    >
                                        {row?.title}
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className={styles.link_group}>
                                            {row?.data?.map((link) => (
                                                <Link
                                                    className={styles.link}
                                                    href={link.href}
                                                    key={link.name}
                                                    target="_blank"
                                                >
                                                    {link?.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            );
                        })}
                    </>
                ) : (
                    <div className={styles.linkGroup} key={index}>
                        {Object.values(linkGroup.links).map((row) => (
                            <div key={row.title} className={styles.options}>
                                <p className={styles.groupTitle}>{row.title}</p>
                                {row?.data?.map((link:{href:string,name:string}) => (
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
                        ))}
                    </div>
                );
            })}
        </div>
      </div>
      <div className={styles.bottom}>
          <div className={styles.footer_info}>
              <p className={styles.copyright}>
                  Copyright © {new Date().getFullYear()} TenWeb. All rights reserved.
              </p>
              <p className={styles.copyright}>
                  Address: 40 E Main St, Suite 721, Newark, DE 19711, United States
              </p>
          </div>


        <div className={styles.socialGroup}>
          <Link
            href="https://join.slack.com/t/10webexperts/shared_invite/zt-1fx3ih612-astlsCmwDIGxO2cd1TzEMA"
            className={styles.social}
          >
            <FaSlack/>
          </Link>
          <Link href="https://twitter.com/10Web_io" className={styles.social}>
              <Twitter/>
          </Link>
          <Link
            href="https://www.youtube.com/c/10Web"
            className={styles.social}
          >
            <FaYoutube/>
          </Link>
          <Link
            href="https://www.facebook.com/10Web.io/"
            className={styles.social}
          >
            <FaFacebook />
          </Link>
          <Link
            href="https://www.linkedin.com/company/10web/"
            className={styles.social}
          >
            <FaLinkedin />
          </Link>
        </div>
      </div>
    </div>
  );
}
