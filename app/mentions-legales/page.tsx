import { LegalPage } from "@/components/legal-page";
import { CONTACT } from "@/lib/nav";
import { LEGAL } from "@/lib/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Mentions légales",
  description:
    "Mentions légales du site Harmonie Yacht : éditeur, hébergeur, propriété intellectuelle.",
  path: "/mentions-legales",
});

export default function MentionsLegalesPage() {
  return (
    <LegalPage
      title="Mentions légales"
      intro="Informations relatives à l'éditeur et à l'hébergeur de ce site, conformément à l'article 6 III de la loi pour la confiance dans l'économie numérique."
      blocks={[
        {
          heading: "Éditeur du site",
          body: [
            [
              `Dénomination : ${LEGAL.companyName}`,
              `Forme juridique : ${LEGAL.legalForm}`,
              `Siège social : ${LEGAL.address}`,
              `SIRET : ${LEGAL.siret}`,
              `TVA intracommunautaire : ${LEGAL.vat}`,
              `Directeur de la publication : ${LEGAL.publisher}`,
              `Téléphone : ${CONTACT.phone}`,
              `Courriel : ${CONTACT.email}`,
            ],
          ],
        },
        {
          heading: "Hébergeur",
          body: [
            [
              LEGAL.host.name,
              LEGAL.host.address,
              LEGAL.host.url,
            ],
          ],
        },
        {
          heading: "Assurance et activité",
          body: [
            `L'activité de location de navire avec équipage est couverte par une assurance responsabilité civile professionnelle : ${LEGAL.insurance}.`,
            "Les sorties sont assurées par un capitaine titulaire des titres requis pour la conduite du navire dans sa zone de navigation.",
          ],
        },
        {
          heading: "Propriété intellectuelle",
          body: [
            "L'ensemble des contenus de ce site — textes, photographies, identité visuelle, code — est protégé par le droit d'auteur. Toute reproduction, même partielle, est soumise à autorisation écrite préalable.",
          ],
        },
        {
          heading: "Signaler un contenu",
          body: [
            `Pour toute demande relative au contenu de ce site, écrivez à ${CONTACT.email}. Nous répondons sous quinze jours.`,
          ],
        },
      ]}
    />
  );
}
