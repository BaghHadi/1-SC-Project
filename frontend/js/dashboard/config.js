export const API_URL = 'http://localhost:3000';
export const TIMEOUT_SEC = 600;
export const MODAL_CLOSE_SEC = 2.5;
export const FUSE_OPTIONS = {
  isCaseSensitive: false,
  includeScore: true,
  shouldSort: true,
  threshold: 0.3,
  keys: [
    'email',
    'prenom',
    'nom',
    'role',
    'structure',
    'date_naissance',
    'active',
  ],
};
export const FUSE_OPTIONS_FOURNISSEURS = {
  isCaseSensitive: false,
  includeScore: true,
  shouldSort: true,
  threshold: 0.3,
  keys: ['raison_sociale', 'adresse', 'telephone', 'fax', 'num_registre'],
};
export const FUSE_OPTIONS_ARTICLES = {
  isCaseSensitive: false,
  includeScore: true,
  shouldSort: true,
  threshold: 0.3,
  keys: ['designation'],
};

export const FUSE_OPTIONS_CMDS = {
  isCaseSensitive: false,
  includeScore: true,
  shouldSort: true,
  threshold: 0.3,
  keys: ['num_commande', 'fournisseur', 'num_commande', 'objet', 'type'],
};
const lc = {
  date_commande: '2024-06-02T23:00:00.000Z',
  etat: 'delivrer',
  fournisseur: 'MACIF FOURNITURE',
  link: 'BonCommande/commande65.pdf',
  num_commande: 65,
  objet: "Papier d'enseignement",
  type: 'fourniture',
};
export const FUSE_OPTIONS_CMDSINT = {
  isCaseSensitive: false,
  includeScore: true,
  shouldSort: true,
  threshold: 0.3,
  keys: ['num_demande', 'id_demandeur'],
};
export const FUSE_OPTIONS_INV = {
  isCaseSensitive: false,
  includeScore: true,
  shouldSort: true,
  threshold: 0.3,
  keys: ['num_inventaire'],
};
export const FUSE_OPTIONS_REF = {
  isCaseSensitive: false,
  includeScore: true,
  shouldSort: true,
  threshold: 0.3,
  keys: ['reference'],
};

export const FUSE_OPTIONS_PROD = {
  isCaseSensitive: false,
  includeScore: true,
  shouldSort: true,
  threshold: 0.3,
  keys: ['article', 'description', 'designation'],
};
export const FUSE_OPTIONS_PROD_INV = {
  isCaseSensitive: false,
  includeScore: true,
  shouldSort: true,
  threshold: 0.3,
  keys: ['raison', 'reference', 'designation', 'num_inventaire'],
};

export const GROUP_DEFINITIONS = {
  'Par Defaut': ['show user', 'change password auth'],
  Utilisateurs: [
    'show users',
    'register',
    'update user',
    'delete user',
    'change status',
    'rattacher',
  ],
  Chapitres: [
    'add chapter',
    'delete chapter',
    'update chapter',
    'show chapters',
  ],
  Produits: [
    'show commande products',
    'show products',
    'add product',
    'delete product',
    'update product',
  ],
  Fournisseurs: [
    'add fournisseur',
    'delete fournisseur',
    'show fournisseurs',
    'update fournisseur',
  ],
  Articles: [
    'show articles',
    'add article',
    'update article',
    'delete article',
  ],
  Commandes: [
    'show commandes',
    'bon commande',
    'delete commande',
    'update quantite',
    'cancel commande',
    'update bon commande',
    'update raison sociale',
    'update reception',
    'delete reception',
    'show bon reception',
    'show bon reception products',
    'upload bon de reception',
    'upload bon de commande',
    'upload bon decharge',
    'upload sortie',
  ],
  Roles: ['show roles', 'add role', 'delete role'],
  Permissions: ['show permissions', 'add permissions', 'delete permissions'],
  Structures: [
    'show structure',
    'update structure',
    'delete structure',
    'add structure',
  ],
  'Commandes Internes': [
    'demande fourniture',
    'delete fourniture',
    'show demande',
    'show new demandes',
    'approuve fourniture by responsable',
    'approuve fourniture by director',
    'approuve fourniture by magasinier',
    'show all demandes',
    'livrer',
    'update approuve by responsable',
    'update approuve by director',
    'update approuve by magasinier',
    'update demande by consommateur',
  ],
  Inventaire: [
    'create inventaire',
    'valid inventaire',
    'show inventaires',
    'show inventaire',
    'delete inventaire',
    'update inventaire',
    'confirm inventaire',
    'update num inventaire',
    'update',
    'show refs',
  ],
  Statistiques: [
    'articleDemandePerYear',
    'rapidFournisseur',
    'respStructureTopDemandeurs',
    'responsableStructureMostdemmandedProduct',
    'topDemandeurs',
    'productDemandePerYear',
    'structureMostdemmandedProduct',
    'structureTopDemandeurs',
    'mostCommandedProducts',
    'mostUsedFournisseur',
    'mostdemmandedProduct',
    'commandesStat',
    'consumerMostdemmandedProduct',
    'productDemandePerYear',
    'structureMostdemmandedProduct',
    'structureTopDemandeurs',
    'mostCommandedProducts',
    'mostUsedFournisseur',
    'mostdemmandedProduct',
    'commandesStat',
    'consumerMostdemmandedProduct',
    'bciStat',
    'bciStructureStat',
    'bciConsommateurStat',
    'respBciStat',
  ],
  Notifications: ['read notif', 'read all notif', 'save token'],
  Modification: ['upload logo', 'upload header'],
};
export const PERM_NAMES = {
  register: 'Inscrire un nouvel utilisateur',
  'show users': 'Afficher les utilisateurs',
  'show user': 'Voir ses Informations',
  'update user': 'Mettre à jour un utilisateur',
  'delete user': 'Supprimer un utilisateur',
  'change status': "Changer le statut d'un utilisateur",
  'change password auth': "Changer le mot de passe d'authentification",
  rattacher: 'Raattacher un utilisateur à une structure',
  'add chapter': 'Ajouter un chapitre',
  'delete chapter': 'Supprimer le chapitre',
  'update chapter': 'Mettre à jour le chapitre',
  'add product': 'Ajouter un produit',
  'delete product': 'Supprimer le produit',
  'show products': 'Afficher les produits',
  'show articles': 'Afficher les articles',
  'add article': 'Ajouter un article',
  'update article': "Mettre à jour l'article",
  'delete article': "Supprimer l'article",
  'add fournisseur': 'Ajouter un fournisseur',
  'delete fournisseur': 'Supprimer le fournisseur',
  'show fournisseurs': 'Afficher les fournisseurs',
  'show chapters': 'Afficher les chapitres',
  'bon commande': 'Ajouter un bon de commande',
  'delete commande': 'Supprimer la commande',
  'update quantite': 'Ajouter un bon de Récéption',
  'cancel commande': 'Annuler la commande',
  'show commandes': 'Afficher les commandes',
  'update bon commande': 'Mettre à jour le bon de commande',
  'update fournisseur': 'Mettre à jour le fournisseur',
  'update raison sociale': 'Mettre à jour la raison sociale',
  'add role': 'Ajouter un rôle',
  'show roles': 'Afficher les rôles',
  'delete role': 'Supprimer le rôle',
  'show permissions': 'Afficher les permissions',
  'add permissions': 'Ajouter des permissions',
  'delete permissions': 'Supprimer des permissions',
  'update structure': 'Mettre à jour la structure',
  'delete structure': 'Supprimer la structure',
  'add structure': 'Ajouter une structure',
  'show structure': 'Afficher la structure',
  'show commande products': 'Afficher les produits commandés.',
  'show bon reception products': 'Afficher les produits de bon de réception',
  'update reception': 'Mettre à jour un bon de réception',
  'delete reception': 'Supprimmer un bon de réception',
  'show bon reception': 'Afficher les bons de réception',
  'demande fourniture': 'Créer un bon de commande interne',
  'delete fourniture': 'Supprimmer une commande interne',
  'show new demandes': 'Voir les nouvelles demandes (Commandes Internes)',
  'show demande': "Voir les détails d'une commadne interne",
  'approuve fourniture by responsable':
    'Approuver les bon de commandes internes (par un responsable directe)',
  'approuve fourniture by director':
    'Approuver les bon de commandes internes (par le directeur)',
  'approuve fourniture by magasinier':
    'Approuver les bon de commandes internes (par le magasinier)',
  'update approuve by responsable':
    "Modifer une approbation d'un bon de commandes internes (par un responsable directe)",
  'update approuve by director':
    "Modifer une approbation d'un bon de commandes internes (par le directeur)",
  'update approuve by magasinier':
    "Modifer une approbation d'un bon de commandes internes (par le magasinier)",
  'update demande by consommateur':
    'Modifier un bon de commande interne (par le consommateur)',
  'show all demandes': 'Voir toutes mes demandes Internes/Externes',
  livrer:
    'Livrer la demande Interne/Externe et générer le Bon de Sortie/Décharge',
  'create inventaire': "Créer un nouvel état d'état de l'inventaire",
  'valid inventaire': "Valider un nouvel état de l'inventaire",
  'show inventaires':
    "Voir l'historique de l'inventaire (tout les états précédents)",
  'show inventaire':
    "Voir un état de l'inventaire en détails (tout les états précédents)",
  'show inventaire': "Voir un état de l'inventaire en détails",
  'delete inventaire': "Supprimer un état de l'inventaire",
  'update inventaire': "Modifier un état de l'inventaire en détails",
};

export const GROUP_BTNS = {
  'Par Defaut': `<a href="" class="sidebar-btns dashbord-btn active " name="Par Defaut">
  <span class="material-icons-sharp"> dashboard </span>
  <h3>Dashboard</h3>
</a>`,
  Utilisateurs: `<a href="" class="sidebar-btns utilisateurs utilisateurs-btn" name="Utilisateurs">
  <span class="material-icons-sharp"> person_outline</span>
  <h3>Utilisateurs</h3>
</a>`,
  Roles: `<a href="" class="sidebar-btns roles-btn" name="Roles">
  <span class="material-icons-sharp"> work </span>
  <h3>Rôles</h3>
</a>`,
  Structures: `<a href="" class="sidebar-btns structures-btn" name="Structures">
  <span class="material-icons-sharp"> school </span>
  <h3>Structures</h3>
</a>`,
  Permissions: `<a class="sidebar-btns permissions-btn" href="" name="Permissions">
  <span class="material-icons-sharp"> manage_accounts </span>
  <h3>Permissions</h3>
</a>`,
  Chapitres: `<a class="sidebar-btns chapitres-btn" href="" name="show chapters">
  <span class="material-icons-sharp"> menu_book </span>
  <h3>Chapitres</h3>
</a>`,
  Fournisseurs: `<a class="sidebar-btns fournisseurs-btn" href="">
  <span class="material-icons-sharp"> local_shipping </span>
  <h3>Fournisseurs</h3>
</a>`,
  Commandes: `<a class="sidebar-btns bon-de-commandes-btn" href="">
  <span class="material-icons-sharp"> description </span>
  <h3>Bon de Commande</h3>
</a>
  `,
  'Commandes Internes': `  <a class="sidebar-btns bon-de-commandes-interne-btn" href="">
  <span class="material-icons-sharp"> assignment </span>
  <h3>Commandes Internes</h3>
</a>
  `,
  Autre: `<a class="sidebar-btns bon-de-commandes-btn" href="">
  <span class="material-icons-sharp"> pending </span>
  <h3>Autres</h3>
</a>
  `,
  Produits: `<a class="sidebar-btns produits-btn" href="">
  <span class="material-icons-sharp produits-btn">
    shopping_cart
  </span>
  <h3>Produits</h3>
</a>
  `,
  Articles: `<a class="sidebar-btns articles-btn" href="" name="show articles">
  <span class="material-icons-sharp"> article </span>
  <h3>Articles</h3>
</a>
  `,
  Inventaire: `<a class="sidebar-btns inventaire-btn" href="">
  <span class="material-icons-sharp"> inventory </span>
  <h3>Inventaire</h3>
</a>
  `,
  Statistiques: `<a class="sidebar-btns statistiques-btn" href="">
  <span class="material-icons-sharp"> query_stats </span>
  <h3>Statistiques</h3>
</a>
  `,
  Modification: `<a class="sidebar-btns modification-btn" href="">
  <span class="material-icons-sharp"> app_registration </span>
  <h3>Modification</h3>
</a>
  `,
  Notifications: ``,
};
export const ORDER_OF_GROUPS = [
  'Par Defaut',
  'Utilisateurs',
  'Structures',
  'Roles',
  'Permissions',
  'Commandes',
  'Commandes Internes',
  'Chapitres',
  'Produits',
  'Articles',
  'Fournisseurs',
  'Inventaire',
  'Statistiques',
  'Notifications',
  'Modification',
  'Autre',
];
// export const STATS_STYLINGS = {
//   topDemandeurs: {
//     title: 'Top Demandeurs',
//     size: 'g2',
//     old: true,
//   },
//   topDemandeurs: {},
//   topDemandeurs: {},
//   topDemandeurs: {},
// };
export const STAT_LINK_CONFIG = {
  articleDemandePerYear: {
    title: 'Articles Demandés Par Année',
    size: 'g2',
    dataName: 'Articles',
    old: false,
    style: 'monthly',
    optionsName: 'article',
    optionsLink: '/Nomenclatures/showArticles',
    optionsPostObj: ['article', 'year'],
    input: 'date',
  },
  rapidFournisseur: {
    title: 'Fournisseurs Rapides',
    size: 'g2',
    dataName: 'fournisseur',
    optionsPostObj: ['dateDebut', 'dateFin'],
    old: false,
    style: 'bar',
    input: 'date',
  },
  respStructureTopDemandeurs: {
    title: 'Responsables Structures Top Demandeurs',
    size: 'g2',
    dataName: 'Demandes',
    old: false,
    style: 'bar',
  },
  responsableStructureMostdemmandedProduct: {
    title: 'Produits les Plus Demandés par Responsables de Structures',
    size: 'g2',
    dataName: 'Produits',
    old: false,
    style: 'bar',
  },
  topDemandeurs: {
    title: 'Top Demandeurs',
    size: 'g2',
    dataName: 'Demandes',
    old: false,
    style: 'bar',
    optionsName: 'produit',
    optionsLink: '/Nomenclatures/showProducts',
    optionsPostObj: ['produit'],
    input: 'date',
  },
  productDemandePerYear: {
    title: 'Produits Demandés Par Année',
    size: 'g2',
    dataName: 'Produits',
    old: false,
    optionsName: 'produit',
    optionsLink: '/Nomenclatures/showProducts',
    optionsPostObj: ['produit', 'year'],
    style: 'monthly',
    input: 'date',
  },
  structureMostdemmandedProduct: {
    title: 'Produits les Plus Demandés par Structure',
    size: 'g2',
    dataName: 'Produits',
    old: false,
    style: 'bar',
    optionsName: 'structure',
    optionsLink: '/Users/showStructure',
    optionsPostObj: ['structure', 'dateDebut', 'dateFin'],
    input: 'date',
  },
  structureTopDemandeurs: {
    title: 'Structures Top Demandeurs',
    size: 'g2',
    dataName: 'Demandes',
    old: false,
    style: 'bar',
    optionsName: 'structure',
    optionsLink: '/Users/showStructure',
    optionsPostObj: ['structure'],
  },
  mostCommandedProducts: {
    title: 'Les Produits Les Plus Commandés',
    size: 'g2',
    dataName: 'Commandes',
    old: false,
    style: 'bar',
  },
  mostUsedFournisseur: {
    title: 'Fournisseurs Les Plus Utilisés',
    size: 'g2',
    dataName: 'Fournisseurs',
    old: false,
    style: 'bar',
  },
  mostdemmandedProduct: {
    title: 'Produits les Plus Demandés',
    size: 'g2',
    dataName: 'Produits',
    old: false,
    style: 'bar',
  },
  commandesStat: {
    title: 'Statistiques des Commandes',
    size: 'g2',
    dataName: 'Commandes',
    old: false,
    style: 'pie',
  },
  consumerMostdemmandedProduct: {
    title: 'Produits les Plus Demandés par Consommateur',
    size: 'g2',
    dataName: 'Produits',
    old: false,
    style: 'bar',
  },
  bciStat: {
    title: 'Statistiques BCI',
    size: 'g2',
    dataName: 'BCI',
    old: false,
    style: 'pie',
  },
  bciConsommateurStat: {
    title: 'Statistiques BCI par Consommateur',
    size: 'g2',
    dataName: 'BCI',
    old: false,
    style: 'pie',
  },
  bciStructureStat: {
    title: 'Statistiques BCI par Structure',
    size: 'g2',
    dataName: 'BCI',
    old: false,
    style: 'pie',
    options: 'structures',
    optionsName: 'structure',
    optionsLink: '/Users/showStructure',
    optionsPostObj: ['structure'],
    input: 'date',
  },
  respBciStat: {
    title: 'Statistiques BCI par Responsable',
    size: 'g2',
    dataName: 'BCI',
    old: false,
    style: 'bar',
  },
};
