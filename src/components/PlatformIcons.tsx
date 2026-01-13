import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const AmazonMusicIcon: React.FC<IconProps> = ({ size = 40, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="#FF9900">
    <path d="M12.257 17.202c-3.95 2.316-9.684 3.549-14.623 3.549-2.022 0-4.002-.237-5.931-.71-.316-.13-.07-.693.245-.463 2.054 1.372 4.582 2.198 7.197 2.198 3.553 0 7.455-1.47 10.117-4.02.467-.43.053-1.006-.37-.669z"/>
    <path d="M13.553 15.66c-.41-.526-2.73-.249-3.775-.126-.318.038-.368-.238-.08-.438 1.847-1.301 4.876-.925 5.229-.49.352.44-.092 3.485-1.826 4.938-.267.224-.52.105-.402-.19.39-.974 1.263-3.167.854-3.693z"/>
    <path d="M9.877 4.37V3.2c0-.178.135-.297.297-.297h5.257c.169 0 .305.122.305.294v1.001c-.003.169-.144.39-.396.74l-2.723 3.886c1.012-.025 2.08.126 2.995.641.206.116.262.287.278.456v1.25c0 .172-.19.372-.389.268-1.627-.852-3.786-.944-5.582.01-.183.098-.376-.1-.376-.27v-1.19c0-.19.003-.515.194-.805l3.153-4.523H10.17c-.169 0-.305-.12-.305-.29h.012z"/>
  </svg>
);

export const DeezerIcon: React.FC<IconProps> = ({ size = 40, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path fill="#FF0092" d="M18.667 0H24v4.8h-5.333z"/>
    <path fill="#FF0092" d="M18.667 6.4H24v4.8h-5.333z"/>
    <path fill="#A238FF" d="M12 6.4h5.333v4.8H12z"/>
    <path fill="#FF0092" d="M18.667 12.8H24v4.8h-5.333z"/>
    <path fill="#A238FF" d="M12 12.8h5.333v4.8H12z"/>
    <path fill="#FFED00" d="M5.333 12.8h5.334v4.8H5.333z"/>
    <path fill="#FF0092" d="M18.667 19.2H24V24h-5.333z"/>
    <path fill="#A238FF" d="M12 19.2h5.333V24H12z"/>
    <path fill="#FFED00" d="M5.333 19.2h5.334V24H5.333z"/>
    <path fill="#40AB5D" d="M0 19.2h4V24H0z"/>
  </svg>
);

export const TencentIcon: React.FC<IconProps> = ({ size = 40, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="#12B7F5">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 14.19c-.42.09-.77-.12-.94-.45-.17-.34-.08-.74.23-.99.89-.72 1.43-1.73 1.43-2.75 0-1.64-1.56-3-3.5-3-.67 0-1.3.15-1.86.42V8.18c.59-.24 1.23-.38 1.86-.38 2.76 0 5 1.91 5 4.2 0 1.45-.74 2.77-1.94 3.71.16.16.28.36.28.58 0 .42-.34.76-.76.76-.12 0-.24-.03-.34-.08-.42.14-.87.22-1.36.22-.35 0-.69-.04-1.01-.12.09-.12.15-.27.15-.43 0-.37-.3-.68-.67-.68-.11 0-.22.03-.31.08-.09-.17-.14-.36-.14-.56 0-.68.55-1.23 1.23-1.23.45 0 .85.25 1.07.61.22-.18.46-.33.72-.46.12-.06.25-.09.38-.09.37 0 .68.3.68.68 0 .24-.13.46-.33.58-.34.2-.62.48-.82.8z"/>
  </svg>
);

export const NetEaseIcon: React.FC<IconProps> = ({ size = 40, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="#C20C0C">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-3.5v-9l6 4.5-6 4.5z"/>
  </svg>
);

export const JioSaavnIcon: React.FC<IconProps> = ({ size = 40, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="#2BC5B4">
    <circle cx="12" cy="12" r="10"/>
    <path fill="white" d="M8 8h8v2H8zm0 3h8v2H8zm0 3h5v2H8z"/>
  </svg>
);

export const AnghamiIcon: React.FC<IconProps> = ({ size = 40, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="#6600CC">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
  </svg>
);

export const BoomplayIcon: React.FC<IconProps> = ({ size = 40, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="#FF6B00">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
);

export const AudiomackIcon: React.FC<IconProps> = ({ size = 40, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="#FFA500">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14H8v-8h2v8zm4 0h-2V8h2v8zm4 0h-2v-8h2v8z"/>
  </svg>
);

export const RessoIcon: React.FC<IconProps> = ({ size = 40, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="#00F0FF">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"/>
  </svg>
);

export const TrillerIcon: React.FC<IconProps> = ({ size = 40, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="#FF0050">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9V7h2v10zm4 0h-2V7h2v10z"/>
  </svg>
);
