import {Dimensions} from 'react-native';
import {Images} from '../../assets';
import {BubbleProps} from './types';
import {SvgProps} from 'react-native-svg';

export const screen = Dimensions.get('screen');
export const imageWidth = screen.width * 0.7;

type ThemeProp = {
  primary: string;
  secondary: string;
  tertiary: string;
  stock: any;
  text1: string;
  text2: string;
  bg: React.FC<SvgProps>;
  bubbles?: BubbleProps[];
};

const Themes: ThemeProp[] = [
  {
    primary: 'rgba(226, 220, 254, 1)',
    secondary: 'rgba(18, 10, 73, 1)',
    tertiary: 'rgba(255, 255, 255, 1)',
    stock: Images.day5Stock4,
    text1: 'Utilize new\nopportunities',
    text2:
      'Add animated 3D objects, filters, and\nspecial effects to your photos and videos',
    bg: Images.day5Vec2,
  },
  {
    primary: 'rgba(57, 139, 73, 1)',
    secondary: 'rgba(255, 255, 255, 1)',
    tertiary: 'rgba(60, 53, 103, 1)',
    stock: Images.day5Stock2,
    text1: 'Take your posts\nto the next level',
    text2:
      'AR feature lets you create stunning\nvisuals and make your posts stand out\nfrom the crowd',
    bg: Images.day5Vec1,
  },
  {
    primary: 'rgba(191, 185, 255, 1)',
    secondary: 'rgba(16, 5, 72, 1)',
    tertiary: 'rgba(255, 255, 255, 1)',
    stock: Images.day5Stock1,
    text1: 'Easy to use',
    text2:
      'Just select the AR button when\ninteracting with posts, choose your\ndesired effect or object, and watch as it\nmagically appear on your screen',
    bg: Images.day5Vec3,
  },
  // {
  //   primary: 'rgba(57, 139, 73, 1)',
  //   secondary: 'rgba(255, 255, 255, 1)',
  //   tertiary: 'rgba(39, 34, 68, 1)',
  //   stock: Images.day5Stock3,
  //   text1: 'Full customization',
  //   text2:
  //     "Express yourself like never before.\nCreate a profile that's uniquely you",
  //   bg: Images.day5Vec4,
  // },
  {
    primary: 'rgba(243, 255, 218, 1)',
    secondary: 'rgba(15, 4, 72, 1)',
    tertiary: 'rgba(255, 255, 255, 1)',
    stock: Images.day5Stock5,
    text1: 'Join our\ncommunity',
    text2: 'Join the fun and connect with\nlike-minded people',
    bg: Images.day5Vec5,
  },
];

export const bubbles: BubbleProps[][] = [
  [
    {
      type: 'top-right',
      text: 'VR Parties',
      color: Themes[0].secondary,
      x: imageWidth * 0.75,
      y: imageWidth * 0.2,
      size: 20,
    },
    {
      text: '🎉',
      x: -imageWidth * 0.1,
      y: imageWidth * 0.2,
      size: 34,
      type: 'top-left',
    },
    {
      text: 'Closer than ever',
      x: -imageWidth * 0.1,
      y: imageWidth * 0.7,
      size: 20,
      type: 'bottom-left',
    },
  ],
  [
    {
      x: imageWidth * 0.7,
      y: imageWidth * 0.15,
      size: 16,
      color: Themes[1].primary,
      type: 'top-right',
      text: 'Use AR Feature',
    },
    {
      x: -imageWidth * 0.12,
      y: imageWidth * 0.75,
      size: 16,
      color: Themes[1].primary,
      type: 'bottom-left',
      text: 'Create custom filters',
    },
    {
      x: -imageWidth * 0.1,
      y: imageWidth * 0.2,
      size: 34,
      type: 'top-left',
      text: '🥰',
    },
    {
      x: imageWidth * 0.9,
      y: imageWidth * 0.5,
      size: 34,
      type: 'top-right',
      text: '😮',
    },
  ],
  [
    {
      type: 'top-right',
      text: '🌝',
      x: imageWidth * 0.9,
      y: imageWidth * 0.3,
      size: 34,
    },
    {
      text: 'Intuitive',
      color: Themes[0].secondary,
      x: -imageWidth * 0.1,
      y: imageWidth * 0.2,
      size: 20,
      type: 'top-left',
    },
    {
      text: 'Full Integration',
      color: Themes[2].secondary,
      x: -imageWidth * 0.1,
      y: imageWidth * 0.7,
      size: 20,
      type: 'bottom-left',
    },
  ],
  [
    {
      text: 'Masks',
      color: Themes[3].secondary,
      x: -imageWidth * 0.1,
      y: imageWidth * 0.55,
      size: 20,
      type: 'top-left',
    },
    {
      text: 'Filters',
      color: Themes[3].secondary,
      x: imageWidth * 0.8,
      y: imageWidth * 0.6,
      size: 20,
      type: 'top-right',
    },
    {
      text: 'Special\neffects',
      color: Themes[3].secondary,
      x: imageWidth * 0.78,
      y: imageWidth * 0.15,
      size: 20,
      type: 'top-right',
    },
    {
      text: '😄',
      size: 40,
      x: -imageWidth * 0.1,
      y: imageWidth * 0.2,
      type: 'circle',
    },
    {
      text: '🤩',
      size: 40,
      x: imageWidth * 0.4,
      y: -imageWidth * 0.06,
      type: 'circle',
    },
    {
      text: '😍',
      size: 40,
      x: imageWidth * 0.65,
      y: imageWidth * 0.9,
      type: 'circle',
    },
  ],
];

const Fonts = {
  primary: {
    regular: 'Anton-Regular',
  },
};

export {Themes, Fonts};
