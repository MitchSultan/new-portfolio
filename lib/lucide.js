'use client';

import { forwardRef, createElement } from 'react';
import {
  Accessibility as AccessibilityIcon,
  AlertCircle as AlertCircleIcon,
  AlertTriangle as AlertTriangleIcon,
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
  ArrowUp as ArrowUpIcon,
  BarChart as BarChartIcon,
  BarChart3 as BarChart3Icon,
  Building as BuildingIcon,
  Calendar as CalendarIcon,
  Check as CheckIcon,
  CheckCircle as CheckCircleIcon,
  ChevronDown as ChevronDownIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronUp as ChevronUpIcon,
  Clock as ClockIcon,
  Code as CodeIcon,
  Copy as CopyIcon,
  Database as DatabaseIcon,
  DollarSign as DollarSignIcon,
  Edit as EditIcon,
  ExternalLink as ExternalLinkIcon,
  Eye as EyeIcon,
  Feather as FeatherIcon,
  FileText as FileTextIcon,
  FolderKanban as FolderKanbanIcon,
  Gauge as GaugeIcon,
  Github as GithubIcon,
  Globe as GlobeIcon,
  HelpCircle as HelpCircleIcon,
  Image as ImageIconBase,
  Layout as LayoutIcon,
  LayoutDashboard as LayoutDashboardIcon,
  LayoutGrid as LayoutGridIcon,
  LineChart as LineChartIcon,
  Link as LinkIcon,
  Linkedin as LinkedinIcon,
  Loader2 as Loader2Icon,
  Lock as LockIcon,
  LogOut as LogOutIcon,
  Mail as MailIcon,
  Megaphone as MegaphoneIcon,
  Menu as MenuIcon,
  MessageCircle as MessageCircleIcon,
  MessageSquare as MessageSquareIcon,
  Palette as PaletteIcon,
  PenTool as PenToolIcon,
  Phone as PhoneIcon,
  Plus as PlusIcon,
  Quote as QuoteIcon,
  RefreshCw as RefreshCwIcon,
  Repeat as RepeatIcon,
  Search as SearchIcon,
  Send as SendIcon,
  Server as ServerIcon,
  Share2 as Share2Icon,
  ShieldCheck as ShieldCheckIcon,
  ShoppingCart as ShoppingCartIcon,
  Smartphone as SmartphoneIcon,
  Star as StarIcon,
  Target as TargetIcon,
  Trash2 as Trash2Icon,
  TrendingDown as TrendingDownIcon,
  TrendingUp as TrendingUpIcon,
  Twitter as TwitterIcon,
  Upload as UploadIcon,
  User as UserIcon,
  Users as UsersIcon,
  Video as VideoIcon,
  X as XIcon,
  XCircle as XCircleIcon,
  Zap as ZapIcon,
} from 'lucide-react';

function wrap(Icon) {
  const Wrapped = forwardRef((props, ref) =>
    createElement(Icon, { ...props, strokeWidth: 1, ref })
  );
  Wrapped.displayName = Icon.displayName;
  return Wrapped;
}

export const Accessibility = wrap(AccessibilityIcon);
export const AlertCircle = wrap(AlertCircleIcon);
export const AlertTriangle = wrap(AlertTriangleIcon);
export const ArrowLeft = wrap(ArrowLeftIcon);
export const ArrowRight = wrap(ArrowRightIcon);
export const ArrowUp = wrap(ArrowUpIcon);
export const BarChart = wrap(BarChartIcon);
export const BarChart3 = wrap(BarChart3Icon);
export const Building = wrap(BuildingIcon);
export const Calendar = wrap(CalendarIcon);
export const Check = wrap(CheckIcon);
export const CheckCircle = wrap(CheckCircleIcon);
export const ChevronDown = wrap(ChevronDownIcon);
export const ChevronLeft = wrap(ChevronLeftIcon);
export const ChevronUp = wrap(ChevronUpIcon);
export const Clock = wrap(ClockIcon);
export const Code = wrap(CodeIcon);
export const Copy = wrap(CopyIcon);
export const Database = wrap(DatabaseIcon);
export const DollarSign = wrap(DollarSignIcon);
export const Edit = wrap(EditIcon);
export const ExternalLink = wrap(ExternalLinkIcon);
export const Eye = wrap(EyeIcon);
export const Feather = wrap(FeatherIcon);
export const FileText = wrap(FileTextIcon);
export const FolderKanban = wrap(FolderKanbanIcon);
export const Gauge = wrap(GaugeIcon);
export const Github = wrap(GithubIcon);
export const Globe = wrap(GlobeIcon);
export const HelpCircle = wrap(HelpCircleIcon);
export const Image = wrap(ImageIconBase);
export const ImageIcon = wrap(ImageIconBase);
export const Layout = wrap(LayoutIcon);
export const LayoutDashboard = wrap(LayoutDashboardIcon);
export const LayoutGrid = wrap(LayoutGridIcon);
export const LineChart = wrap(LineChartIcon);
export const Link = wrap(LinkIcon);
export const Linkedin = wrap(LinkedinIcon);
export const Loader2 = wrap(Loader2Icon);
export const Lock = wrap(LockIcon);
export const LogOut = wrap(LogOutIcon);
export const Mail = wrap(MailIcon);
export const Megaphone = wrap(MegaphoneIcon);
export const Menu = wrap(MenuIcon);
export const MessageCircle = wrap(MessageCircleIcon);
export const MessageSquare = wrap(MessageSquareIcon);
export const Palette = wrap(PaletteIcon);
export const PenTool = wrap(PenToolIcon);
export const Phone = wrap(PhoneIcon);
export const Plus = wrap(PlusIcon);
export const Quote = wrap(QuoteIcon);
export const RefreshCw = wrap(RefreshCwIcon);
export const Repeat = wrap(RepeatIcon);
export const Search = wrap(SearchIcon);
export const Send = wrap(SendIcon);
export const Server = wrap(ServerIcon);
export const Share2 = wrap(Share2Icon);
export const ShieldCheck = wrap(ShieldCheckIcon);
export const ShoppingCart = wrap(ShoppingCartIcon);
export const Smartphone = wrap(SmartphoneIcon);
export const Star = wrap(StarIcon);
export const Target = wrap(TargetIcon);
export const Trash2 = wrap(Trash2Icon);
export const TrendingDown = wrap(TrendingDownIcon);
export const TrendingUp = wrap(TrendingUpIcon);
export const Twitter = wrap(TwitterIcon);
export const Upload = wrap(UploadIcon);
export const User = wrap(UserIcon);
export const Users = wrap(UsersIcon);
export const Video = wrap(VideoIcon);
export const X = wrap(XIcon);
export const XCircle = wrap(XCircleIcon);
export const Zap = wrap(ZapIcon);
