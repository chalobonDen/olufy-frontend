import { Fragment } from 'react'

import clsx from 'clsx'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

import UserTermsHeroSection from '@/components/User/Sections/TermsHeroSection'
import UserContainer from '@/components/UI/User/Container'
import type { DocumentProps } from '@/renderer/types'

export const Page = () => {
  const { i18n } = useLingui()
  return (
    <Fragment>
      <UserTermsHeroSection title={i18n._(t`Privacy Policy`)} />
      <section className={clsx(`pb-14 pt-8`)}>
        <UserContainer>
          <div className={clsx(`text-content`)}>
            <h2>Privacy policy</h2>
            <p>
              This privacy policy ("Policy") describes how Website Operator ("Website Operator", "we", "us" or "our")
              collects, protects and uses the personally identifiable information ("Personal Information") you ("User",
              "you" or "your") may provide on the{' '}
              <a target="_blank" rel="nofollow" href="https://olufy.com">
                olufy.com
              </a>{' '}
              website and any of its products or services (collectively, "Website" or "Services").
            </p>
            <p>
              It also describes the choices available to you regarding our use of your Personal Information and how you
              can access and update this information. This Policy does not apply to the practices of companies that we
              do not own or control, or to individuals that we do not employ or manage.
            </p>
            <h2>Automatic collection of information</h2>
            <p>
              When you visit the Website our servers automatically record information that your browser sends. This data
              may include information such as your device's IP address, browser type and version, operating system type
              and version, language preferences or the webpage you were visiting before you came to our Website, pages
              of our Website that you visit, the time spent on those pages, information you search for on our Website,
              access times and dates, and other statistics.
            </p>
            <p>
              Information collected automatically is used only to identify potential cases of abuse and establish
              statistical information regarding Website usage. This statistical information is not otherwise aggregated
              in such a way that would identify any particular user of the system.
            </p>
            <h2>Collection of personal information</h2>
            <p>
              You can visit the Website without telling us who you are or revealing any information by which someone
              could identify you as a specific, identifiable individual. If, however, you wish to use some of the
              Website's features, you will be asked to provide certain Personal Information (for example, your name and
              e-mail address). We receive and store any information you knowingly provide to us when you create an
              account, or fill any online forms on the Website. When required, this information may include the
              following:
            </p>
            <ul>
              <li>Personal details such as name, country of residence, etc.</li>
              <li>Contact information such as email address, address, etc.</li>
              <li>Account details such as user name, unique user ID, password, etc.</li>
            </ul>
            <p>
              You can choose not to provide us with your Personal Information, but then you may not be able to take
              advantage of some of the Website's features. Users who are uncertain about what information is mandatory
              are welcome to contact us.
            </p>
            <h2>Managing personal information</h2>
            <p>
              You are able to delete certain Personal Information we have about you. The Personal Information you can
              delete may change as the Website or Services change. When you delete Personal Information, however, we may
              maintain a copy of the unrevised Personal Information in our records for the duration necessary to comply
              with our obligations to our affiliates and partners, and for the purposes described below.
            </p>
            <h2>Storing personal information</h2>
            <p>
              We will retain and use your Personal Information for the period necessary to comply with our legal
              obligations, resolve disputes, and enforce our agreements unless a longer retention period is required or
              permitted by law. We may use any aggregated data derived from or incorporating your Personal Information
              after you update or delete it, but not in a manner that would identify you personally. Once the retention
              period expires, Personal Information shall be deleted. Therefore, the right to access, the right to
              erasure, the right to rectification and the right to data portability cannot be enforced after the
              expiration of the retention period.
            </p>
            <h2>Use and processing of collected information</h2>
            <p>
              In order to make our Website and Services available to you, or to meet a legal obligation, we need to
              collect and use certain Personal Information. If you do not provide the information that we request, we
              may not be able to provide you with the requested products or services. Some of the information we collect
              is directly from you via our Website. However, we may also collect Personal Information about you from
              other sources. Any of the information we collect from you may be used for the following purposes:
            </p>
            <ul>
              <li>Create and manage user accounts</li>
              <li>Respond to inquiries and offer support</li>
              <li>Request user feedback</li>
              <li>Improve user experience</li>
              <li>Run and operate our Website and Services</li>
            </ul>
            <p>
              Processing your Personal Information depends on how you interact with our Website, where you are located
              in the world and if one of the following applies: (i) You have given your consent for one or more specific
              purposes. This, however, does not apply, whenever the processing of Personal Information is subject to
              European data protection law; (ii) Provision of information is necessary for the performance of an
              agreement with you and/or for any pre-contractual obligations thereof; (iii) Processing is necessary for
              compliance with a legal obligation to which you are subject; (iv) Processing is related to a task that is
              carried out in the public interest or in the exercise of official authority vested in us; (v) Processing
              is necessary for the purposes of the legitimate interests pursued by us or by a third party.
            </p>
            <p>
              {' '}
              Note that under some legislations we may be allowed to process information until you object to such
              processing (by opting out), without having to rely on consent or any other of the following legal bases
              below. In any case, we will be happy to clarify the specific legal basis that applies to the processing,
              and in particular whether the provision of Personal Information is a statutory or contractual requirement,
              or a requirement necessary to enter into a contract.
            </p>
            <h2>Facebook permissions asked by this Application</h2>
            <p>
              This Application may ask for some Facebook permissions allowing it to perform actions with the User's
              Facebook account and to retrieve information, including Personal Data, from it. This service allows this
              Application to connect with the User's account on the Facebook social network, provided by Facebook Inc.
            </p>
            <p>
              For more information about the following permissions, refer to the Facebook permissions documentation and
              to the Facebook privacy policy.
            </p>
            <p>
              <b>The permissions asked are the following:</b>
            </p>
            <p>
              <b>Basic information</b>
              By default, this includes certain User’s Data such as id, name, picture, gender, and their locale. Certain
              connections of the User, such as the Friends, are also available. If the User has made more of their Data
              public, more information will be available.
            </p>
            <p>
              <b>About Me</b>
              Provides access to the 'About Me' section of the profile.
            </p>
            <p>
              <b>Email</b>
              Provides access to the User's primary email address.
            </p>
            <h3>Detailed information on the processing of Personal Data</h3>
            <p>Personal Data is collected for the following purposes and using the following services:</p>
            <div className="border p-2">
              <b>Access to third-party accounts</b>
              <p>
                This type of service allows this Application to access Data from your account on a third-party service
                and perform actions with it. These services are not activated automatically, but require explicit
                authorization by the User.
              </p>
              <p>
                <b>Facebook account access (Facebook, Inc.)</b>
              </p>
              <p>
                This service allows this Application to connect with the User's account on the Facebook social network,
                provided by Facebook, Inc.
              </p>
              <p>Permissions asked: About Me; Email.</p>
              <p>
                Place of processing: United States –{' '}
                <a target="_blank" href="https://www.facebook.com/policy.php">
                  Privacy Policy.
                </a>
              </p>
            </div>
            <h2>The rights of users</h2>
            <p>
              You may exercise certain rights regarding your information processed by us. In particular, you have the
              right to do the following: (i) you have the right to withdraw consent where you have previously given your
              consent to the processing of your information; (ii) you have the right to object to the processing of your
              information if the processing is carried out on a legal basis other than consent; (iii) you have the right
              to learn if information is being processed by us, obtain disclosure regarding certain aspects of the
              processing and obtain a copy of the information undergoing processing; (iv) you have the right to verify
              the accuracy of your information and ask for it to be updated or corrected; (v) you have the right, under
              certain circumstances, to restrict the processing of your information, in which case, we will not process
              your information for any purpose other than storing it; (vi) you have the right, under certain
              circumstances, to obtain the erasure of your Personal Information from us; (vii) you have the right to
              receive your information in a structured, commonly used and machine readable format and, if technically
              feasible, to have it transmitted to another controller without any hindrance. This provision is applicable
              provided that your information is processed by automated means and that the processing is based on your
              consent, on a contract which you are part of or on pre-contractual obligations thereof.
            </p>
            <h2>Privacy of children</h2>
            <p>
              We do not knowingly collect any Personal Information from children under the age of 13. If you are under
              the age of 13, please do not submit any Personal Information through our Website or Service. We encourage
              parents and legal guardians to monitor their children's Internet usage and to help enforce this Policy by
              instructing their children never to provide Personal Information through our Website or Service without
              their permission.
            </p>
            <p>
              If you have reason to believe that a child under the age of 13 has provided Personal Information to us
              through our Website or Service, please contact us. You must also be old enough to consent to the
              processing of your Personal Information in your country (in some countries we may allow your parent or
              guardian to do so on your behalf).
            </p>
            <h2>Cookies</h2>
            <p>
              The Website uses "cookies" to help personalize your online experience. A cookie is a text file that is
              placed on your hard disk by a web page server. Cookies cannot be used to run programs or deliver viruses
              to your computer. Cookies are uniquely assigned to you, and can only be read by a web server in the domain
              that issued the cookie to you.
            </p>
            <p>
              We may use cookies to collect, store, and track information for statistical purposes to operate our
              Website and Services. You have the ability to accept or decline cookies. Most web browsers automatically
              accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. If you
              choose to decline cookies, you will not be able to use and experience the features of the Website and
              Services. To learn more about cookies and how to manage them, visit{' '}
              <a target="_blank" href="https://www.internetcookies.org">
                internetcookies.org
              </a>
            </p>
            <h2>Do Not Track signals</h2>
            <p>
              Some browsers incorporate a Do Not Track feature that signals to websites you visit that you do not want
              to have your online activity tracked. Tracking is not the same as using or collecting information in
              connection with a website. For these purposes, tracking refers to collecting personally identifiable
              information from consumers who use or visit a website or online service as they move across different
              websites over time. How browsers communicate the Do Not Track signal is not yet uniform. As a result, this
              Website is not yet set up to interpret or respond to Do Not Track signals communicated by your browser.
              Even so, as described in more detail throughout this Policy, we limit our use and collection of your
              personal information.
            </p>
            <h2>Links to other websites</h2>
            <p>
              Our Website contains links to other websites that are not owned or controlled by us. Please be aware that
              we are not responsible for the privacy practices of such other websites or third-parties. We encourage you
              to be aware when you leave our Website and to read the privacy statements of each and every website that
              may collect Personal Information.
            </p>
            <h2>Information security</h2>
            <p>
              We secure information you provide on computer servers in a controlled, secure environment, protected from
              unauthorized access, use, or disclosure. We maintain reasonable administrative, technical, and physical
              safeguards in an effort to protect against unauthorized access, use, modification, and disclosure of
              Personal Information in its control and custody. However, no data transmission over the Internet or
              wireless network can be guaranteed. Therefore, while we strive to protect your Personal Information, you
              acknowledge that (i) there are security and privacy limitations of the Internet which are beyond our
              control; (ii) the security, integrity, and privacy of any and all information and data exchanged between
              you and our Website cannot be guaranteed; and (iii) any such information and data may be viewed or
              tampered with in transit by a third-party, despite best efforts.
            </p>
            <h2>Data breach</h2>
            <p>
              In the event we become aware that the security of the Website has been compromised or users Personal
              Information has been disclosed to unrelated third parties as a result of external activity, including, but
              not limited to, security attacks or fraud, we reserve the right to take reasonably appropriate measures,
              including, but not limited to, investigation and reporting, as well as notification to and cooperation
              with law enforcement authorities. In the event of a data breach, we will make reasonable efforts to notify
              affected individuals if we believe that there is a reasonable risk of harm to the user as a result of the
              breach or if notice is otherwise required by law. When we do, we will send you an email, get in touch with
              you over the phone.
            </p>
            <h2>Legal disclosure</h2>
            <p>
              We will disclose any information we collect, use or receive if required or permitted by law, such as to
              comply with a subpoena, or similar legal process, and when we believe in good faith that disclosure is
              necessary to protect our rights, protect your safety or the safety of others, investigate fraud, or
              respond to a government request.
            </p>
            <h2>Changes and amendments</h2>
            <p>
              We may update this Privacy Policy from time to time in our discretion and will notify you of any material
              changes to the way in which we treat Personal Information. When changes are made, we will revise the
              updated date at the bottom of this page. We may also provide notice to you in other ways in our
              discretion, such as through contact information you have provided. Any updated version of this Privacy
              Policy will be effective immediately upon the posting of the revised Privacy Policy unless otherwise
              specified. Your continued use of the Website or Services after the effective date of the revised Privacy
              Policy (or such other act specified at that time) will constitute your consent to those changes. However,
              we will not, without your consent, use your Personal Data in a manner materially different than what was
              stated at the time your Personal Data was collected. Policy was created with{' '}
              {/* <a
                style="color:inherit"
                target="_blank"
                title="Sample privacy policy template"
                href="https://www.websitepolicies.com/blog/sample-privacy-policy-template"
              >
                WebsitePolicies
              </a> */}
              .
            </p>
            <h2>Acceptance of this policy</h2>
            <p>
              You acknowledge that you have read this Policy and agree to all its terms and conditions. By using the
              Website or its Services you agree to be bound by this Policy. If you do not agree to abide by the terms of
              this Policy, you are not authorized to use or access the Website and its Services.
            </p>
            <h2>Contacting us</h2>
            <p>
              If you would like to contact us to understand more about this Agreement or wish to contact us concerning
              any matter relating to it, you may do so via the{' '}
              <a target="_blank" rel="nofollow" href="https://olufy.com/th/contact">
                contact form
              </a>
              , send an email to info@olufy.com or write a letter to 138/37 Soi Ladprao 41 Intersection 6-9, Ladprao
              Road, Chankasem, Chatuchak, Bangkok 10230
            </p>
          </div>
        </UserContainer>
      </section>
    </Fragment>
  )
}

export const documentProps: DocumentProps = {
  title: 'Privacy Policy',
}
