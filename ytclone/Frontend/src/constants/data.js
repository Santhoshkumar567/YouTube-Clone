
import {  SiYoutubegaming } from "react-icons/si";
import { MdVideoLibrary, MdOutlineLocalMovies } from "react-icons/md";
import { VscHistory } from "react-icons/vsc";
import { AiOutlinePlaySquare, AiOutlineClockCircle, AiOutlineBulb } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import { BsNewspaper } from "react-icons/bs";
import { HiOutlineFire } from "react-icons/hi";
import { IoMusicalNoteOutline } from "react-icons/io5";
import { CiTrophy } from "react-icons/ci";
import { GiDress } from "react-icons/gi";
import { HiSignal } from "react-icons/hi2";
import {GoHistory} from "react-icons/go";

import {MdOutlineWatchLater} from "react-icons/md"

import {FaBagShopping} from "react-icons/fa6";
import {MdPodcasts} from "react-icons/md";
import {BsYoutube} from "react-icons/bs";
import {SiYoutubestudio} from "react-icons/si";
import {SiYoutubemusic} from "react-icons/si";
import {TbBrandYoutubeKids} from "react-icons/tb";
import {AiOutlineSetting} from "react-icons/ai";
import {MdOutlinedFlag} from "react-icons/md";
import {BiHelpCircle} from "react-icons/bi";
import {RiFeedbackLine} from "react-icons/ri";
export const SideBarItems = {
  Top: [

    {
        icon: GoHistory ,
        name: "history",
    },
    {
      icon: AiOutlinePlaySquare,
      name: "Your videos",
    },
    {
      icon: MdOutlineWatchLater ,
      name: "watch Later",
    },

  ],
  Middle: [
    {
      icon : FaBagShopping,
      name : "shopping",
    },
    {
      icon: IoMusicalNoteOutline,
      name: "Music",
    },
    {
      icon: MdOutlineLocalMovies,
      name: "Movies",
    },
    {
      icon: HiSignal,
      name: "Live",
    },
    {
      icon: SiYoutubegaming,
      name: "Gaming",
    },
    {
      icon: BsNewspaper,
      name: "News",
    },
    {
      icon: CiTrophy,
      name: "Sports",
    },
    {
      icon: AiOutlineBulb,
      name: "Learning",
    },
    {
      icon: GiDress,
      name: "Fashion & beauty",
    },
    {
      icon : MdPodcasts,
      name:"podcasts"
    }
  ],
  Bottom: [
   {
    icon : BsYoutube,
    name : "YouTube Premium"
   },
   {
    icon : SiYoutubestudio,
    name : "YouTube Studio"
   },
   {
    icon :SiYoutubemusic ,
    name: "YouTube Music",
   },
   {
    icon :TbBrandYoutubeKids ,
    name: "YouTube Kids",
   }
  ],
  Last:[
    {
      icon:AiOutlineSetting ,
      name: "settings",
    },
    {
      icon:MdOutlinedFlag ,
      name: "Report History",
    }, {
      icon: BiHelpCircle,
      name: "Help",
    },
    {
      icon:RiFeedbackLine ,
      name: "feedback",
    },
  ]
};

