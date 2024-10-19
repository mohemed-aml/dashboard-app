// src/components/login/OAuthProviderButtons.tsx
import styles from '@/styles/Login.module.css';
import Image from 'next/image'
import { Provider } from '@supabase/supabase-js'; // Import Provider type

interface OAuthProviderButtonsProps {
  handleAuth: (provider: Provider) => void;
  providers: Provider[];
}

const OAuthProviderButtons: React.FC<OAuthProviderButtonsProps> = ({ handleAuth, providers }) => (
  <div className={styles.iconContainer}>
    {providers.map((provider) => (
      <Image
        src={`/${provider}.svg`}
        alt={`${provider} login`}
        className={styles.authIcon}
        onClick={() => handleAuth(provider)}
        key={provider}
        width={2}
        height={2}
      />
      
    ))}
  </div>
);

export default OAuthProviderButtons;
