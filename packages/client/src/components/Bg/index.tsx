import styles from './Bg.module.scss'

interface BgProps {
  url: string
  bgType?: 'image' | 'video' | 'css'
}
export const Bg: React.FC<BgProps> = ({ url }) => {
  return (
    <img
      src={url}
      className={styles.bg}
      style={{ background: `url(${url})` }}
    />
  )
}
