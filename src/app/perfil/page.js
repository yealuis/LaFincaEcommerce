import ProfileSection from '@/components/profile/ProfileSection'
import styles from './page.module.css'

const profilePage = () => {
  return (
    <div className={styles.profilePage}>
      <ProfileSection />
    </div>
  )
}

export default profilePage