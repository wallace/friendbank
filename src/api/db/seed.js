const { MongoClient, ObjectId } = require('mongodb');
const { passwordHash } = require('../utils/auth');
const { ENGLISH, SPANISH } = require('../../shared/lang');
const { STAFF_ROLE } = require('../../shared/roles');
const { TRANSACTIONAL_EMAIL } = require('../../shared/emailFrequency');

(async function() {
  console.log('Seeding database...');

  const client = await MongoClient.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  db = client.db();

  await db.dropDatabase();

  const defaultMediaObjects = [
    {
      _id: 'default',
      type: 'image',
      source: 'https://friendbank.s3.amazonaws.com/get-learnt-w-teachers.jpeg',
      alt: 'Jonathan with teachers',
    },
    {
      _id: 'jonathan-speaking-with-voters',
      type: 'image',
      source: 'https://friendbank.s3.amazonaws.com/voter-outside-convo.jpeg',
      alt: 'Jonathan speaking with voters',
    },
    {
      _id: 'jonathan-with-doctors-learning',
      type: 'image',
      source: 'https://friendbank.s3.amazonaws.com/doctors-learning.jpg',
      alt: 'Jonathan with doctors',
    },
    {
      _id: 'fierce-v',
      type: 'image',
      source: 'https://friendbank.s3.amazonaws.com/fierce-v.jpeg',
      alt: 'Jonathan and team',
    },
    {
      _id: 'jonathan-with-supporters',
      type: 'image',
      source: 'https://friendbank.s3.amazonaws.com/jonathan-supporters.jpeg',
      alt: 'Jonathan with supporters',
    },
    {
      _id: 'jonathan-with-doctors',
      type: 'image',
      source: 'https://friendbank.s3.amazonaws.com/jonathan-doctors.jpg',
      alt: 'Jonathan with Doctors',
    },
    {
      _id: 'jonathan-campaign-staff-and-volunteers',
      type: 'image',
      source: 'https://friendbank.s3.amazonaws.com/jonathan-sign-supporters.jpeg',
      alt: 'Jonathan and Campaign Staff and Volunteers',
    },
    {
      _id: 'jonathan-laughing',
      type: 'image',
      source: 'https://friendbank.s3.amazonaws.com/jonathan-kristina.jpeg',
      alt: 'Jonathan and Kristina laughing',
    },
    {
      _id: 'jonathan-yvonne',
      type: 'image',
      source: 'https://friendbank.s3.amazonaws.com/Wallace+Campaign-20.jpg',
      alt: 'Jonathan standing with Yvonne'
    },
    {
      _id: '2-kids-learning',
      type: 'image',
      source: 'https://friendbank.s3.amazonaws.com/2-kids-learning.png',
      alt: 'Jonathan with students',
    },
  ];

  const media = db.collection('media');
  await media.insertMany(defaultMediaObjects);

  const config = JSON.stringify({
    disableNavDonate: true,
    media: defaultMediaObjects.map((object) => object._id),
    defaultMedia: {
      _id: 'jonathan-with-supporters',
      type: 'image',
      source: 'https://friendbank.s3.amazonaws.com/jonathan-supporters.jpeg',
      alt: 'Jonathan with supporters',
    },
  });

  const copy = JSON.stringify({
    'idQuestions.support.label': {
      [ENGLISH]: 'Will you vote to re-elect Jonathan Wallace to the Georgia House before November 3rd?',
      [SPANISH]: '¿Votará para reelegir a Jonathan Wallace al Cámara de Representantes antes del 3 de noviembre?',
    },
    'idQuestions.support.options': {
      [ENGLISH]: [
        'Definitely',
        'Probably',
        'Undecided',
        'Probably not',
        'Definitely not',
        'Too Young/Ineligible to Vote',
      ],
      [SPANISH]: [
        'Definitivamente',
        'Probablemente',
        'Indeciso',
        'Probablemente no',
        'Definitivamente no',
        'Demasiado joven/Inelegible para votar',
      ],
    },
    'idQuestions.volunteer.label': {
      [ENGLISH]: 'Will you volunteer with Team Wallace?',
      [SPANISH]: '¿Quiéres ser voluntario con el Equipo Wallace?',
    },
    'idQuestions.volunteer.options': {
      [ENGLISH]: [
        'Yes',
        'Maybe',
        'Later',
        'No',
      ],
      [SPANISH]: [
        'Sí',
        'Tal vez',
        'Más tarde',
        'No',
      ],
    },
    'idQuestions.vote.label': {
      [ENGLISH]: 'Are you planning to vote by mail for Jonathan in the November general election?',
    },
    'idQuestions.vote.subtitle': {
      [ENGLISH]: 'Voting by mail is the safest way to make your voice heard in this election. An application to vote by mail will be mailed to each registered voter in GA (or you can download one and mail or email it in). Just complete that application, send it back, and you’ll receive a ballot to vote for Jonathan by mail. Skip the polls, stay safe, and get your vote for Jonathan in early -- vote by mail!',
    },
    'idQuestions.vote.options': {
      [ENGLISH]: [
        'Yes, and I’ve already sent in my vote by mail application',
        'Yes, and I need a vote by mail application',
        'No, I’m not sure about voting by mail',
        'I’d like to learn more about voting by mail',
      ],
    },
    'voteStatus.label': {
      [ENGLISH]: 'Make a plan to vote for Jonathan in the Georgia General election!',
    },
    'voteStatus.subtitle': {
      [ENGLISH]: 'Our future and our planet are on the line. Make your voice heard by making a plan to vote for Jonathan Wallace in the Georgia General Election. If you have not already applied to vote by mail, please make a plan to vote early or on Election Day.',
    },
    'voteStatus.options': {
      [ENGLISH]: [
        'I’ve already voted',
        'I’ve received my mail-in ballot and still need to return it',
        'I’m planning to vote early between October 12-30',
        'I’m planning to vote on Election Day, November 3',
      ],
    },
    'actions.gotv.label': {
      [ENGLISH]: 'GOTV Actions',
    },
    'actions.gotv.options': {
      [ENGLISH]: [
        'Received Ballot Application',
        'Mailed in Ballot Application',
        'Received Ballot',
        'Voted for Jonathan! (Mailed in completed ballot)',
      ],
    },
    'homepage.formTitle': {
      [ENGLISH]: 'Create your own Jonathan Wallace supporter page',
      [SPANISH]: 'Crea tu propia página de apoyo para Jonathan Wallace',
    },
    'homepage.formSubtitle': {
      [ENGLISH]: 'Our grassroots campaign is powered by people like you who are connecting with family, friends, and neighbors about this important election. Complete the sections below to create your own personal supporter page and reach out to your network about why you’re a member of Team Wallace!',
      [SPANISH]: 'Nuestra campaña está impulsada por gente como tú que se está conectando con familia, amigos y vecinos sobre esta elección importante. Completa las siguientes secciones para crear tu propia página de apoyo personal y hablarle a tus redes de por qué eres miembro del Equipo Wallace!',
    },
    'homepage.customizeTitle': {
      [ENGLISH]: 'Customize your page',
      [SPANISH]: 'Personaliza tu página',
    },
    'homepage.customizeSubtitle': {
      [ENGLISH]: `Fill out the sections below to personalize the title, description, and design of your supporter page to tell your network why you’re #Wallacefor119. Share your story of why you’re a member of this movement -- feel free to get creative!`,
      [SPANISH]: `Llena las siguientes secciones para personalizar el título, la descripción y el diseño de tu página de apoyo para decirle a tus redes por qué estás #Wallacefor119. Comparte tu historia de por qué eres miembro de este movimiento. ¡Siéntete libre de ser creativo!`,
    },
    'homepage.formButtonLabel': {
      [ENGLISH]: 'next',
      [SPANISH]: 'siguiente',
    },
    'homepage.createButtonLabel': {
      [ENGLISH]: 'create page',
      [SPANISH]: 'crear página',
    },
    'homepage.defaultTitle': {
      [ENGLISH]: `{{FIRST_NAME}} is #Wallacefor119 because...`,
      [SPANISH]: '{{FIRST_NAME}} está #Wallacefor119 porque...'
    },
    'homepage.defaultSubtitle': {
      [ENGLISH]: 'Jonathan comes from a working family, and he’s fighting from the heart for the working class. Jonathan is running a people-powered campaign, and it’s up to us to help make sure he can keep fighting in the State House for our shared progressive values. Let me know that you are with me, and help me reach my goal!',
      [SPANISH]: 'Jonathan viene de una familia trabajadora y está luchando con todo su corazón por la clase trabajadora. Jonathan está llevando a cabo una campaña impulsada por la gente y depende de nosotros asegurarnos de que pueda seguir luchando en el Senado por nuestros valores progresistas. ¡Háganme saber que están conmigo y ayúdenme a alcanzar mi meta!',
    },
    'signupPage.postSignupSubtitle': {
      [ENGLISH]: 'Next, keep up the momentum by sharing this link with your friends, family, and network, and help {{FIRST_NAME}} reach their goal! Or, make your own page and get everyone you know to join the fight.',
      [SPANISH]: '¡Mantén el impulso compartiendo este enlace con tus amigos, familia y redes y ayuda a {{FIRST_NAME}} alcanzar su objetivo! O haz tu propia página y haz que todo el que conoces se una a la lucha.',
    },
    'signupPage.postSignupCreateTitle': {
      [ENGLISH]: 'Make your own page',
      [SPANISH]: 'Haz tu propia página',
    },
    'signupPage.postSignupCreateSubtitle': {
      [ENGLISH]: 'Create your own supporter page and become a grassroots organizer for Jonathan. We’ll show you how!',
      [SPANISH]: 'Crea tu propia página de apoyo y conviértete en un organizador en tu comunidad para Jonathan. ¡Te mostraremos cómo!',
    },
    'signupPage.postSignupCreateButtonLabel': {
      [ENGLISH]: 'Get started',
      [SPANISH]: 'Comenzar',
    },
    'signupPage.modalTitle': {
      [ENGLISH]: `Here's how you can join Jonathan's fight`,
      [SPANISH]: 'Como puedes unirte a la lucha de Jonathan',
    },
    'signupPage.modalCopy': {
      [ENGLISH]: [
        `### Send your link far and wide`,
        `Share this page with your network to help us grow Team Wallace! Your friends, family, neighbors, colleagues, roommates, classmates, Facebook friends, Twitter peeps, your Zoom hangout friends -- the sky's the limit, and we need to reach everyone.`,
        `### Relational organizing tips`,
        ` - Call 5 friends and ask them to fill out your link`,
        ` - Email your link to 50 people`,
        ` - Share it on your Facebook and other social media`,
        ` - Go through your contact list in your phone and text the link to at least 10 people!`,
        ' ',
        `### Volunteer with Team Wallace`,
        `[Join the movement here](http://www.wallacefor119.com/volunteer).`,
      ],
      [SPANISH]: [
        '### Comparte tu enlace',
        `¡Comparte esta página con tus redes para ayudarnos a crecer el Equipo Wallace! Tus amigos, familia, vecinos, colegas, compañeros de habitación, compañeros de clase, amigos de Facebook, seguidores en Twitter, tus amigos de Zoom...el cielo es el límite y tenemos que llegar a todos.`,
        `### Consejos para organizar relacionalmente`,
        ` - Llama a 5 amigos y pídeles que llenen tu enlace`,
        ` - Envía tu enlace a 50 personas`,
        ` - Compártelo en tu Facebook y otras redes sociales`,
        ` - ¡Revisa la lista de contactos de tu teléfono y envía el enlace al menos a 10 personas!`,
        ` `,
        `### Ser voluntario con el Equipo Wallace`,
        `[Únete al movimiento aquí](http://www.wallacefor119.com/volunteer).`,
      ],
    },
    'signupPage.modalCloseLabel': {
      [ENGLISH]: 'Okay, got it',
      [SPANISH]: 'Perfecto, lo tengo.',
    },
    'nav.logoAlt': {
      [ENGLISH]: 'Jonathan Wallace For 119 Logo',
      [SPANISH]: 'Logo de Jonathan Wallace para 119',
    },
    'nav.return': {
      [ENGLISH]: '← return to wallacefor119.com',
      [SPANISH]: '← volver a wallacefor119.com',
    },
    'nav.returnLink': {
      [ENGLISH]: 'https://www.wallacefor119.com/',
      [SPANISH]: 'https://www.wallacefor119.com/',
    },
    'nav.donateForm': {
      [ENGLISH]: 'https://secure.actblue.com/donate/wallaceforga',
    },
    'phonebankPage.title': {
      [ENGLISH]: 'Add a Contact',
      [SPANISH]: 'Añadir un contacto',
    },
    'phonebankPage.subtitle': {
      [ENGLISH]: 'Enter your friends, family, and people in your network. Grow your list of the people you’re personally bringing to this grassroots movement, let Jonathan know if they support him, and help make sure this campaign reaches its goals.',
      [SPANISH]: 'Añade a tus amigos, familiares y personas de tu red. Crece tu lista de personas que personalmente trajiste a este movimiento impulsado por el pueblo, déjale saber a Jonathan si lo apoyan y ayuda a la campaña a alcanzar sus metas.',
    },
    'phonebankPage.successfullySubmitted': {
      [ENGLISH]: 'Successfully submitted contact!',
      [SPANISH]: '¡Contacto creado con éxito!',
    },
    'privacyPolicy.label': {
      [ENGLISH]: 'Privacy Policy',
      [SPANISH]: 'Política de privacidad',
    },
    'privacyPolicy.link': {
      [ENGLISH]: 'https://www.wallacefor119.com/privacy-policy/',
      [SPANISH]: 'https://www.wallacefor119.com/privacy-policy/',
    },
    'politicalDiclaimer': {
      [ENGLISH]: 'PAID FOR BY THE JONATHAN WALLACE FOR STATE HOUSE COMMITTEE',
      [SPANISH]: 'PAGADO POR THE JONATHAN WALLACE FOR STATE HOUSE COMMITTEE',
    },
    'smsDisclaimer': {
      [ENGLISH]: 'By providing your cell phone number you consent to receive periodic campaign updates from the Jonathan Wallace for State House Committee. Text HELP for help, STOP to end. Message & data rates may apply.',
      [SPANISH]: 'Al proporcionar su número de teléfono celular usted consiente en recibir actualizaciones periódicas de la campaña de The Jonathan Wallace for State House Committee. Envíe un mensaje de texto que diga HELP para pedir ayuda o STOP para descontinuar los mensajes. Pueden aplicar tarifas de mensajes y data.',
    },
    'genericError': {
      [ENGLISH]: 'Looks like we had an error, try again? If this continues to happen, please contact us https://www.wallacefor119.com/contact/',
      [SPANISH]: 'Parece que tuvimos un error, ¿intentar de nuevo? Si esto continúa sucediendo, por favor contáctenos https://www.wallacefor119.com/contact/',
    },
  });

  const campaigns = db.collection('campaigns');
  const campaignResult = await campaigns.insertOne({
    domains: ['localhost:5000', 'friendbank-wallacefor119.herokuapp.com', 'support.wallacefor119.com'],
    name: 'Friendbank Dev',
    copy,
    config,
  });

  const campaign = campaignResult.ops[0];
  const campaignId = campaign._id.toString();

  const hashedPassword = await passwordHash('password');
  const users = db.collection('users');

  const userInsertResult = await users.insertOne({
    campaign: campaignId,
    email: 'admin@friendbank.us',
    password: hashedPassword,
    firstName: 'Joe',
    zip: '00000',
    emailFrequency: TRANSACTIONAL_EMAIL,
    createdAt: Date.now(),
    lastUpdatedAt: Date.now(),
    lastAuthenticationUpdate: Date.now(),
    role: STAFF_ROLE,
  });

  const adminUser = userInsertResult.ops[0];

  const signups = db.collection('signups');
  const signupSeed = new Array(50).fill({
    email: `${Math.round(Math.random() * 10000)}@gmail.com`,
    recruitedBy: adminUser._id.toString(),
    campaign: campaign._id.toString(),
    type: 'contact',
    lastUpdatedAt: Date.now(),
    firstName: 'First',
    phone: '',
    zip: '',
    supportLevel: '',
    volunteerLevel: '',
  }).map((signup, index) => ({
    ...signup,
    _id: new ObjectId(),
    lastName: `${index}`,
    note: `This is a note ${Math.random()}`,
  }));

  await signups.insertMany(signupSeed);
  console.log('Seeding complete. You may hit Ctrl + C to quit');
})();
