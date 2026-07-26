import { LegalPage } from "@/components/legal-page";
import { CONTACT } from "@/lib/nav";
import { LEGAL } from "@/lib/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Conditions générales de vente",
  description:
    "Conditions de réservation, d'annulation et de déroulement des sorties en mer et nuits à bord Harmonie Yacht.",
  path: "/cgv",
});

export default function CgvPage() {
  return (
    <LegalPage
      title="Conditions générales de vente"
      intro="Ce que vous réservez, ce que nous garantissons, et ce qui se passe si la météo ne coopère pas. Écrit pour être lu, pas pour se protéger de vous."
      updatedAt={LEGAL.updatedAt}
      blocks={[
        {
          heading: "Objet",
          body: [
            `Les présentes conditions régissent la location du navire avec capitaine proposée par ${LEGAL.companyName} au départ du port de Carnon. Toute réservation vaut acceptation de ces conditions.`,
            "⚠️ À COMPLÉTER : faites relire ces conditions par votre assureur ou votre conseil avant la mise en ligne — notamment les montants d'acompte, les délais d'annulation et la clause de responsabilité, qui doivent refléter votre contrat d'assurance réel.",
          ],
        },
        {
          heading: "Réservation et paiement",
          body: [
            "Une demande envoyée depuis le site ne vaut pas réservation : elle déclenche une vérification de disponibilité et de météo. Nous confirmons sous 24 heures.",
            "La réservation devient ferme à la réception de l'acompte. Le solde est réglé le jour de la sortie, avant l'embarquement.",
            "⚠️ À COMPLÉTER : montant ou pourcentage de l'acompte, et moyens de paiement acceptés.",
          ],
        },
        {
          heading: "Annulation par vos soins",
          body: [
            "⚠️ À COMPLÉTER : barème d'annulation (par exemple, acompte remboursé au-delà de 30 jours, retenu en deçà de 7 jours).",
            "Un report à une autre date reste toujours préférable à une annulation : proposez-nous une date, nous ferons notre possible.",
          ],
        },
        {
          heading: "Annulation pour cause de météo",
          body: [
            "La décision de sortir appartient au capitaine, seul juge des conditions de navigation. Elle n'est pas négociable et n'a pas à être justifiée au-delà de la sécurité.",
            "Si nous annulons pour raison météorologique ou technique, vous choisissez : report gratuit à une date qui vous convient, ou remboursement intégral des sommes versées.",
          ],
        },
        {
          heading: "Déroulement de la sortie",
          body: [
            "La durée réservée court à partir de l'heure d'embarquement convenue. Un retard de votre part ne prolonge pas la sortie.",
            "Le capitaine peut modifier l'itinéraire, écourter ou interrompre la sortie si la sécurité, la météo ou le comportement des passagers l'exigent, sans que cela ouvre droit à remboursement.",
            "Les consignes de sécurité données à bord s'appliquent à tous les passagers sans exception. Les mineurs restent sous la responsabilité des adultes qui les accompagnent.",
          ],
        },
        {
          heading: "Capacité et effets personnels",
          body: [
            "Le nombre de passagers indiqué pour chaque formule est un maximum réglementaire qui ne peut être dépassé, quelles que soient les circonstances.",
            "Nous ne sommes pas responsables des effets personnels perdus, mouillés ou endommagés à bord. Les dégradations volontaires du navire ou de son équipement sont à la charge du client.",
          ],
        },
        {
          heading: "Nuit à bord",
          body: [
            "La nuit insolite se déroule au mouillage, à proximité de la côte. Le navire reste sous la responsabilité du capitaine, qui décide du lieu de mouillage en fonction des conditions.",
            "Le confort à bord dépend de l'état de la mer : une houle résiduelle peut rendre la nuit plus mouvementée qu'à quai. Nous vous prévenons quand nous savons que ce sera le cas.",
          ],
        },
        {
          heading: "Réclamation et litige",
          body: [
            `Toute réclamation doit nous être adressée à ${CONTACT.email} dans les meilleurs délais. Nous répondons systématiquement.`,
            "À défaut d'accord amiable, vous pouvez recourir gratuitement à un médiateur de la consommation avant toute action judiciaire.",
            "⚠️ À COMPLÉTER : nom et coordonnées du médiateur de la consommation auquel vous adhérez — c'est une obligation pour les professionnels vendant à des particuliers.",
          ],
        },
      ]}
    />
  );
}
