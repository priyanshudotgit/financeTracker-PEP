import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { User, Mail, Calendar, LogOut, ShieldCheck } from 'lucide-react';
import ProfileCard from '../components/ProfileCard';

const Profile = () => {
  const { user } = useAuthContext();

  return (
    <div className="w-full h-screen p-20 dark:bg-slate-900 dark:text-white">
      <ProfileCard 
      user={user}
      overlayColor="rgba(0, 0, 0, 0.2)"
      blurStrength={30}
      glassDistortion={0}
      metalness={0}
      roughness={1}
      displacementStrength={10}
      noiseScale={10}
      specularConstant={0.8}
      grayscale={0}
      color="#ffffff" />
    </div>
  );
};

export default Profile;