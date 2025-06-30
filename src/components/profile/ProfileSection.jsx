import styles from './profile.module.css'
import ProfileHeader from './ProfileHeader'
import ProfileCard from './ProfileCard'
import AccountForm from './AccountForm'

const ProfileSection = () => {
  return (
    <>
      <ProfileHeader />
      <div className={styles.profileContent}>
        <div className={styles.profileGrid}>
          <div className={styles.accountFormContainer}>
            <AccountForm />
          </div>
          <div className={styles.profileCardContainer}>
            <ProfileCard />
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileSection