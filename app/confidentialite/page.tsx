import { LegalPage } from "@/components/legal-page";
import { CONTACT } from "@/lib/nav";
import { LEGAL } from "@/lib/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Politique de confidentialité",
  description:
    "Comment Harmonie Yacht collecte, utilise et conserve vos données personnelles, et comment exercer vos droits.",
  path: "/confidentialite",
});

export default function ConfidentialitePage() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      intro="Nous ne collectons que ce dont nous avons besoin pour organiser votre sortie, et rien d'autre. Voici précisément quoi, pourquoi, et pendant combien de temps."
      updatedAt={LEGAL.updatedAt}
      blocks={[
        {
          heading: "Qui traite vos données",
          body: [
            `${LEGAL.companyName}, dont le siège est situé ${LEGAL.address}, est responsable du traitement. Pour toute question, écrivez à ${CONTACT.email}.`,
          ],
        },
        {
          heading: "Ce que nous collectons",
          body: [
            "Uniquement ce que vous saisissez dans le formulaire de réservation ou de contact :",
            [
              "Votre nom et votre téléphone — pour vous rappeler et confirmer la date.",
              "Votre adresse électronique, si vous la renseignez — pour vous écrire.",
              "La date souhaitée, la formule et le nombre de personnes — pour vérifier la disponibilité.",
              "Le message libre que vous nous laissez, s'il y en a un.",
            ],
            "Nous ne demandons aucune donnée bancaire sur ce site.",
          ],
        },
        {
          heading: "Pourquoi, et sur quelle base",
          body: [
            "Ces données servent exclusivement à répondre à votre demande et à organiser la sortie. La base légale est l'exécution de mesures précontractuelles prises à votre demande (RGPD, art. 6.1.b).",
            "Nous ne vous inscrivons à aucune liste de diffusion sans votre accord explicite, et nous ne vendons ni ne cédons vos données à des tiers.",
          ],
        },
        {
          heading: "Combien de temps nous les gardons",
          body: [
            "Les demandes sans suite sont supprimées au bout de douze mois. Les réservations effectivement réalisées sont conservées le temps imposé par nos obligations comptables, soit dix ans.",
          ],
        },
        {
          heading: "Qui d'autre y a accès",
          body: [
            "Notre hébergeur, qui stocke techniquement le site, et notre fournisseur de messagerie, qui achemine vos messages. Aucun de ces prestataires n'exploite vos données pour son compte.",
            "Si votre sortie inclut une prestation de notre partenaire traiteur, nous ne lui transmettons que ce qui est nécessaire au service — jamais vos coordonnées complètes sans vous prévenir.",
          ],
        },
        {
          heading: "Vos droits",
          body: [
            "Vous pouvez à tout moment demander l'accès à vos données, leur rectification, leur effacement, la limitation de leur traitement, ou vous opposer à celui-ci.",
            `Écrivez simplement à ${CONTACT.email} : nous répondons sous un mois. Si la réponse ne vous convient pas, vous pouvez saisir la CNIL (cnil.fr).`,
          ],
        },
        {
          heading: "Cookies",
          body: [
            "Ce site ne dépose aucun cookie publicitaire ni de mesure d'audience. Seul un marqueur technique temporaire est utilisé pour ne pas rejouer l'animation d'accueil à chaque page — il disparaît à la fermeture de l'onglet et ne permet pas de vous identifier.",
          ],
        },
      ]}
    />
  );
}
