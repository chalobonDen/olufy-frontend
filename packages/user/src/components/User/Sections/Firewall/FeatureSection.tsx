import { useLingui } from '@lingui/react'
import clsx from 'clsx'
import { t } from '@lingui/macro'
import { SvgIcon } from '@olufy-frontend/shared/UI'

import UserTitle from '@/components/UI/User/Title'
import UserCard from '@/components/UI/User/Card'
import UserContainer from '@/components/UI/User/Container'

const mockFeatureFirewall = [
  {
    title: 'Firewall Protection',
    description: t`Protect layer 3 - 4 & layer 7 ด้วยการป้องกัน Layer 3 - 4 และ 7 ที่มีประสิทธิภาพที่สุด`,
  },
  {
    title: 'TCP',
    description: t`TCP Spoof, SYN+ACK, FIN, RESET, ACK, ACK+PSH, Fragment, Amplification`,
  },
  {
    title: 'Layer 3-4',
    description: t`UDP Spoof, Flood, SYN Flood, ICMP (Ping) Flood, Slowloris`,
  },
  {
    title: 'Layer 7',
    description: t`HTTP Flood, Brute Force, Connection Flood, HTTP Killer, DNS Flood`,
  },
  {
    title: 'Advance Proect',
    description: t`NXDomain, Mixed SYN + UDP, ICMP + UDP Flood, Ping of Death, Smurf`,
  },
  {
    title: 'Game Firewall',
    description: t`Protect advance game server, like same Game Guard`,
  },
]

const gameSupport = [
  t`Block All UDP`,
  t`TeamSpeak 3 Server`,
  t`Minecraft`,
  t`ARK: Survival Evolved`,
  t`RUST Survival`,
  t`Tales Runner`,
  t`RAN Online`,
  t`Etc.`,
  ,
]

const UserFirewallFeatureSection = () => {
  const { i18n } = useLingui()
  return (
    <section className={clsx(`pb-20 pt-12`)}>
      <UserContainer>
        <UserTitle className={clsx(`text-center`)}>{i18n._(t`Firewall`)}</UserTitle>

        <div className={clsx(`mt-10 grid grid-cols-4 gap-6`, `2xl:gap-4`, `lg:grid-cols-1`)}>
          <UserCard>
            <SvgIcon name="feature-security-shield" className={clsx(`square-20`)} />
            <h4 className={clsx(`mt-2 block text-header-3`, `sm:text-header-5`)}>Support Game & Application</h4>
            <div className={clsx(`desc mt-2`)}>Protect your Game and Application custom</div>
            <ul className={clsx(`mt-2 list-inside list-disc`)}>
              {gameSupport.map((game, gameIdx) => (
                <li key={`game-${gameIdx}`}>
                  <span className={clsx(`desc inline-block`)}>{game}</span>
                </li>
              ))}
            </ul>
          </UserCard>
          <div
            className={clsx(
              `col-span-3 grid grid-cols-3 gap-6`,
              `2xl:gap-4`,
              `md:grid-cols-2`,
              `lg:col-span-1`,
              `sm:grid-cols-1`,
            )}
          >
            {mockFeatureFirewall.map((feature, featureIdx) => (
              <UserCard key={`feature-${featureIdx}`}>
                <SvgIcon name="feature-firewall" className={clsx(`square-20`)} />
                <h4 className={clsx(`mt-2 text-header-3`, `sm:text-header-5`)}>{feature.title}</h4>
                <div className={clsx(`desc mt-2`)}>{feature.description}</div>
              </UserCard>
            ))}
          </div>
        </div>
      </UserContainer>
    </section>
  )
}

export default UserFirewallFeatureSection
