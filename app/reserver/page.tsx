import { BookingStage } from "@/components/booking/booking-stage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Réserver votre traversée",
  description:
    "Réservez votre sortie en mer ou votre nuit insolite à bord en quelques étapes : choisissez votre expérience, votre formule, votre date — nous confirmons sous 24h.",
  path: "/reserver",
  image: "/images/exterieur-coucher-soleil.jpg",
});

export default function ReserverPage() {
  return <BookingStage />;
}
