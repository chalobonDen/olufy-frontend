import type { UserConfig } from '@/types/cookie-consent'

export const COOKIE_CONSENT_CONFIG: UserConfig = {
  current_lang: 'th',
  autorun: true,
  autoclear_cookies: true,
  use_rfc_cookie: false,
  gui_options: {
    consent_modal: {
      layout: 'cloud', // box/cloud/bar
      position: 'bottom center', // bottom/middle/top + left/right/center
      transition: 'slide', // zoom/slide
      swap_buttons: false, // enable to invert buttons
    },
    settings_modal: {
      layout: 'box', // box/bar
      transition: 'slide', // zoom/slide
    },
  },
  languages: {
    th: {
      consent_modal: {
        title: 'เว็บไซต์นี้ใช้คุกกี้',
        description:
          'เราใช้คุกกี้เพื่อเพิ่มประสิทธิภาพ และประสบการณ์ที่ดีในการใช้งานเว็บไซต์ คุณสามารถเลือกตั้งค่าความยินยอมการใช้คุกกี้ได้ โดยคลิก "การตั้งค่าคุกกี้" <a href="/privacy-policy" class="cc-link">นโยบายความเป็นส่วนตัว</a>',
        primary_btn: {
          text: 'ยอมรับ',
          role: 'accept_all', // 'accept_selected' or 'accept_all'
        },
        secondary_btn: {
          text: 'การตั้งค่า',
          role: 'settings', // 'settings' or 'accept_necessary'
        },
      },
      settings_modal: {
        title: 'การตั้งค่าความเป็นส่วนตัว',
        save_settings_btn: 'ยืนยันตัวเลือกของฉัน',
        accept_all_btn: 'ยอมรับทั้งหมด',
        close_btn_label: 'Close',
        blocks: [
          {
            title: 'คุกกี้พื้นฐานที่จำเป็น',
            description:
              'คุกกี้พื้นฐานที่จำเป็น เพื่อช่วยให้การทำงานหลักของเว็บไซต์ใช้งานได้ รวมถึงการเข้าถึงพื้นที่ที่ปลอดภัยต่าง ๆ ของเว็บไซต์ หากไม่มีคุกกี้นี้เว็บไซต์จะไม่สามารถทำงานได้อย่างเหมาะสม และจะใช้งานได้โดยการตั้งค่าเริ่มต้น โดยไม่สามารถปิดการใช้งานได้',
            toggle: {
              value: 'necessary',
              enabled: true,
              readonly: true, // cookie categories with readonly=true are all treated as "necessary cookies"
            },
          },
          {
            title: 'คุกกี้ในส่วนวิเคราะห์',
            description:
              'คุกกี้ในส่วนวิเคราะห์ จะช่วยให้เว็บไซต์เข้าใจรูปแบบการใช้งานของผู้เข้าชมและจะช่วยปรับปรุงประสบการณ์การใช้งาน โดยการเก็บรวบรวมข้อมูลและรายงานผลการใช้งานของผู้ใช้งาน ',
            toggle: {
              value: 'analytics', // your cookie category
              enabled: false,
              readonly: false,
            },
          },
          {
            title: 'คุกกี้ในส่วนการตลาด',
            description:
              'คุกกี้ในส่วนการตลาด ใช้เพื่อติดตามพฤติกรรมผู้เข้าชมเว็บไซต์เพื่อแสดงโฆษณาที่เหมาะสมสำหรับผู้ใช้งาน แต่ละราย และเพื่อเพิ่มประสิทธิผลการโฆษณาสำหรับผู้เผยแพร่และผู้โฆษณาสำหรับบุคคลที่สาม',
            toggle: {
              value: 'targeting',
              enabled: false,
              readonly: false,
            },
          },
        ],
      },
    },
    en: {
      consent_modal: {
        title: 'We use cookies',
        description:
          'This website uses cookies to enhance your browsing experience on our website, to show you personalized content and targeted ads, to analyze our website traffic, and to understand where our visitors are coming from. You can manage your preferences by clicking "Change Preferences"." <a href="/privacy-policy" class="cc-link">Privacy Policy</a>',
        primary_btn: {
          text: 'Accept All',
          role: 'accept_all', // 'accept_selected' or 'accept_all'
        },
        secondary_btn: {
          text: 'Change Preferences',
          role: 'settings', // 'settings' or 'accept_necessary'
        },
      },
      settings_modal: {
        title: 'Privacy Preference',
        save_settings_btn: 'Confirm My Choices',
        accept_all_btn: 'Accept All',
        close_btn_label: 'Close',
        blocks: [
          {
            title: 'Necessary',
            description:
              'Necessary cookies are required to help a website usable by enabling core functions and access to secure areas of the website. The website cannot be function properly without these cookies and they are enabled by default and cannot be disabled.',
            toggle: {
              value: 'necessary',
              enabled: true,
              readonly: true, // cookie categories with readonly=true are all treated as "necessary cookies"
            },
          },
          {
            title: 'Analytics',
            description:
              'Analytics cookies help website to understand how visitors interact through the website. These cookies help to improve user experiences by collecting and reporting information.',
            toggle: {
              value: 'analytics', // your cookie category
              enabled: false,
              readonly: false,
            },
          },
          {
            title: 'Marketing',
            description:
              'Marketing cookies are used to track visitors across websites to display relevant advertisements for the individual user and thereby more valuable for publishers and third party advertisers.',
            toggle: {
              value: 'targeting',
              enabled: false,
              readonly: false,
            },
          },
        ],
      },
    },
  },
  page_scripts: true,
}
