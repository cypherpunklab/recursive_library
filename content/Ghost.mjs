import { getMetadata, getSatAt, getChildrenAll } from "/content/Recursive.mjs";
const Dictionary = {
  Background: {
    "Calling Into Sacrifice":
      "18613e558f93ada3e3b20d4bed882717ad4cb8e60d67f47102b8b912384a72edi0",
    "Reaper Cementery":
      "3798de9b882a8dff4a03cc5d11bb78f4321a140538237a16ecc2f4563bc4fadbi0",
    "Ghost Cemetery":
      "e96225de63cac29ec1c6e7ce0eb0b329de88828de0976c6413a4afd9aa391940i0",
    "Blood Moon Woods":
      "5d8c72b64cf34c8b8231d0ed8d0d2e32e013a794c7049f18e56b8f6e720c67e1i0",
    "Alone In Pantheon":
      "23aee852b5f15368c42aad9833b35ef006a8252d56fa689120e8d60b26ec44aei0",
    "Ordinal Warp":
      "98f400118c3c4bb5f750d858150fdc6e3929be5b9b734d4b3847e43382637ff9i0",
    "Blood Castle":
      "abd5b0d217ed19bf47dba6c5f4fa16bbbfecc4516177d422d378f5e24ede5e29i0",
    "Ghul Background Technus":
      "8d7480d0d879acfba3ba1d945414e8a0d323f02732ddfe7296371d94b33cbdb0i0",
    Dungeon:
      "3d24947366d2e7b61c384d5362cf26f1d50ac50879a087b41c74bd5de926412ci0",
    "Ghul Halloween":
      "ac6f39f462bd94c2b057f8d2cea256cb3dd12950d63304fd7342402e7d13badbi0",
    Tarantula:
      "a8e5bbc9f34283250151aa8f5f65c97845a8b001ae8635842c1233c821fb2964i0",
    "Ghul Neo":
      "776fd991d2584e35de4d0199540e0a1c81924915f4cc6db9e8eb5a6d78114fbci0",
    "Ghul Matrix":
      "e61e92fe6b0becaf6d869d11c9b78bb3b1a102d4466178e158f5987ff5d2c324i0",
    "Ordinal Wall":
      "94509235271d75d4b81fbf69e50ed2fb55a8544e41a3a1701b2e88643f480ad7i0",
    Destruction:
      "630cdfda45b483535f5bcb0052d574974d84ed2265adf6ee9b380cbff3d26b29i0",
  },
  Outfit: {
    "Stain Hood":
      "1de7bf4d3cc779655cc7db7077a09b0323cf4ab085fae04f85f11c0b986bd8d7i0",
    Pumpkin:
      "7a1da10cb3d74b9fe508c446568e58e565f962e9a57a9cf4861b9194a3deaf74i0",
    "Bitcoin Gold":
      "5b4627cf1d77d4899a2404d507ab1c093d7ebaaf02a61f71b1488bdab0f1dd12i0",
    "Tulu Hood":
      "6934d2c45689371a01947b233f453d79e666e99060a7c5e290d6ab124cab8a59i0",
    "Golden Scarecrow":
      "38185a0bb377494142416de08293499d070c480e0ea97b481a64ca94308c4b53i0",
    Swang: "89a640b400e741c189a749a8230ae5096aa39d8e1c8207edf4c87afb9d8bdba8i0",
    "Golden Pumpkin":
      "3de42c0c4cf2c15403d1101890a12ce106d5e180e569b3dd01820bf05bbe33b2i0",
    "Running Bitcoin":
      "7d3158de0de001966ce835c85462afc777f61a9130de1d08f260be1c97e0a979i0",
    "Golden Webber":
      "480661c020b7a1f40592b5c8428bd1a130b9563b585417ce8daa633ea2371468i0",
    Kugar: "fc21c65535c9910d4513935d6a2c7207956319ba610b015d1a7e354bc541f5c2i0",
    Spider:
      "a1f134b90248e1e796e2221b28ff9c154ed88b8a44479c8d7d4ed8f83f4f0da7i0",
    Scarecrow:
      "a8b049db1c2bdee26b4644ee0ac2817ba5919452d76d36061cc862e057dfa27di0",
    Voodoo:
      "f36683f0f90d2c1218f694e69a3adfbb8f9d847de1fca865dcd78f83bc6c195ci0",
    Munition:
      "1669b3c83c4c2d2ba0248edaadb6eef65f668ab77b8adedd211b734551d2fd5bi0",
    Webber:
      "11d1215566e18defc1f4366b872cee954c12e0d888cad6cd3965cd1d006fc451i0",
    Bitcoin:
      "7f3fdf4620afc731c816f632573e1aebea287082c618c4c2cde67775d20daba1i0",
    Black: "41347aa937d8759d527625cf5ccb87f73c22a1a90353d7cfcda9a61da3c56951i0",
  },
  Body: {
    "Alien From Stomache":
      "0adb6bd99b5d4134fa2bf25fce34efb1433715ba24aec1957f2f356cc7fc9c1ci0",
    "Chain With Lock":
      "c5ec2bf21e226652e5c44610434cced7bd64d82705784aa01fc269ecbb43a572i0",
    "Golden Scissors":
      "2d6fa5bce60d9205dd1c727020643f3bfdd27a15babc749c5c0c47ad3e8e7726i0",
    Scissors:
      "a891eb812ce11c8d24f6af8807ff6a729f829e78e55ea28b29f941b4dd365c5ei0",
    Sello: "e2c03d26a2b9798838e894772f2658e835d4b1464b65387816fad7803db55b51i0",
    "Skull Necklace":
      "705ffbcf499ab22c364b43a00e63d806096e12e69035c78ac90d921a29be6668i0",
    "Spike Necklace":
      "36f65508805c2f10505a4f1389cab823a74674822f904240a91ecd0b2ef6e0f0i0",
  },
  Eyes: {
    "Red Human":
      "a57ba11ce5d51bf5eb378ea8f89f20f29308a0380107871000445dc735577c99i0",
    "Green Human":
      "7779b891548cbe977893592f5de65fc281ba384a6d91038cd0dcf66c1fe8f03ai0",
    "Blue Human":
      "e61bee9cda385c1ab6209530328428dc3c1857588c038e21030e18c3e4fb8faai0",
    "Alien White":
      "2b25a96206a2f2f5fd0c44b87dff792a74452902507ffa1bee38553f2df76f31i0",
    "Human Yellow":
      "928ff1db46dac53a2a5f4e7bfd4e97e58e65ae16194b72e14dca25a929189c7ci0",
    "Alien Green":
      "5a36730b211aec1f3b96c650d0d3f958c4d50bcf9fb8f650412f1a9b062d12b8i0",
    "Alien Red":
      "8ab61f8dd45af7c86e011223ae73033a2912798c0d11a9ec5492afebec692b8di0",
    "Alien Black":
      "66df73ad60a42f5a970e8be0dfd347f3ce6cac2785baa926f1ee2698ae37135di0",
    "Human Black":
      "c6bf9078bd69f81cce9d754e44142c9c88e06baa4eb2ff4b685bd5f991f46c47i0",
  },
  Mask: {
    Fall: "de91a699a073727dad258d49afd183a0a39bea04d907131550c105f188885f00i0",
    ElocNuro:
      "bfa70839e2f820be847360045a83a687c509ae644bbed5675ec424f8eab68258i0",
    "Turn Another Leaf":
      "6409a9fd2ec7b477d19bca42d62e046d6bb7502b64f49361d4805af25af630aai0",
    "Blood Brother":
      "551137efae6c5feb867b352a50354b2ae42734f96e3ab09cc46667c5291ce3bai0",
    Ela: "e7bedeeb5552de098c1cf6c68fe5703171a0c63816408cc7126175ea0fe2fbdci0",
    Breeth:
      "cf4bcc17898a6e264ece68b6f2977d878837212777d99267ada32e460a7076cci0",
    "Blood Sister":
      "b3d6983843b6628a6660f3f36d64117b06ebb2c7861968533afad5e5beb68940i0",
    Lab: "7311a64c86234fed6034d8951afb89dac57c3fa03beb79b70cfbf2ae2cf6c623i0",
    Blood: "86fd760cce9a3f7cbd35bae6917ac9b928ee5487556754f0912b2fda799f386fi0",
    Golden:
      "3bac23ec85fbcc5de483881daac29cd521845d31ada0fc54729d8d77dd1b0d2bi0",
    Code: "082e21928802ab2981fd518ca6100f97267f02b6cef330fc955c97ccaf9e3257i0",
    "Bad Good":
      "afdd4d5b628bdcc7746688992239e0d0f15eae5cabacc9af7295059c856ee811i0",
    "Hanel Pixan":
      "a3972de410a339b1d1117aead6dc022391cd161da724f10323153029fc20fcc4i0",
    Worm: "f5af06c8541b5ed612e967f6c59b0aef0ef62dc00c7f044792cd6b0cf7e27cb5i0",
  },
  Face: {
    HAHA: "b0f1d9b1068fd916eea4810a97e950612710d40a9d24f12825587ae02109ffcci0",
    Bandage:
      "df054cbf5d0d8e74d7774a6264578e45bc969f7f1f4accaf258a070527d7d604i0",
    "Eye Ball":
      "70243363a99534a8d190a10ea13c1670521f80176a396e26c9c179fabfe15803i0",
    "Golden Horn":
      "15d61b6f57583a9a0fff7e33bb6e958896e4b7ee5700ddf0028d8cff8544bdfbi0",
    Horn: "7a416bdebd801b6413e226be35288433e5ced0db0a729d8ac595f688e9443f13i0",
    "Ordinals Cap":
      "18dd4c9544b73b64792b65914578592a2237e4ad808bfe5034d7a974ffe3045ai0",
  },
  Hand: {
    Oz: "628eda789b81cae3bed90caa84b4610312057b528935f4ec03fefd8412599cdbi0",
    "Wood Stick":
      "dd6d3a321778bc1ec4560a2166ee406a6ca5ae014ce70e8b6577f7f47dbc75aci0",
    Slasher:
      "6347674af01a6c0d9a7ccca3327b918e8389e2e248ed7437508fe9da9c10df2ci0",
    "Golden Mushdead":
      "4bf4c7768cc4943e5351dcc2f8766e8a3a6163f28ea4a93449f0014acac4ed43i0",
    Necronomicon:
      "e6141c6578bbacb7a790383cafe280f746d943dc9e886f1b477e26a55559e82ai0",
    "Dangerous Banana":
      "005bae9a2a80b2cb1047c4777e791eab3d2cedfecee33a96b42a90fbf7f5b6d3i0",
    Mushdead:
      "f975fac343eb30ba237983b9da537499eda55a764e903e94db611dc82400ce19i0",
    "Golden Candle":
      "8880a04c59e555e4dd02f34c73de06ff24d6cb34262b500b6a9deda9f8e5a290i0",
    Kueger:
      "b4ced259debc3fb3e6c943c64c1e3b4786d445b6a58849428e733def701ab5f9i0",
    "Explosive Pumpkin":
      "db30cc1844605d8c8e2ff5b925e11ab1ac8cbe1852e34424a2edc68271d6fa88i0",
    "Red Candle":
      "3fa6ae40eaadc24de5476662abeb7829d32e60f944143460e3e707722734253ei0",
    "Oz Gold":
      "b037fde223bc735459bad25d9df0b6d52590540b5768b5503145553de85f730ci0",
    Reaper:
      "34affba61afc0e0d09c918c163e4ff786055c18abe6695b11f3c494e574f1a56i0",
    "Golden Chess":
      "39c39a193a38a6f64ce853c7a5b531f4a2f51b55aceabe73ed74d6bcc82763f2i0",
    Knife: "3607fbe0cd4f96348ef931b34f599c02449220a0aada95bfef7f52c257a627bdi0",
  },
  Special: {
    Rodarmor:
      "856794cb90eef318492a6697820b79f9cfe6020bd73ff732c7651b78808afa5fi0",
  },
};

async function drawImagesOnCanvas(imageUrls) {
  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Image loading error: " + src));
      img.src = src;
    });
  };

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const imgElements = await Promise.all(imageUrls.map(loadImage));
  canvas.width = imgElements[0].naturalWidth;
  canvas.height = imgElements[0].naturalHeight;

  imgElements.forEach((img) =>
    context.drawImage(img, 0, 0, canvas.width, canvas.height)
  );
  return canvas.toDataURL("image/png");
}

const loadCartridge = async (metaData, satEndpoint) => {
  if (metaData) {
    const login = metaData.Title;
    if (login) {
      let functions = [];
      let lines = [
        "LOGGED IN AS",
        login,
        "==============================",
        "TRAITS ",
        "==============================",
      ];

      if (metaData.Attributes) {
        const attributes = Object.entries(metaData.Attributes).map(
          ([key, value]) => `${key}: ${value}`
        );
        lines.push(...attributes);
        lines.push("==============================");
      }

      functions = [{ name: "TRAITS", lines }];

      try {
        const remoteCartId = await getSatAt(satEndpoint);

        let remoteCartridge;
        if (remoteCartId.id) {
          remoteCartridge = await fetch(
            `${window.location.origin}/content/${remoteCartId.id}`
          ).then((response) => response.json());
          functions = remoteCartridge.functions;
          functions.unshift({ name: "TRAITS", lines });

          if (remoteCartridge.newLink) {
            Link = remoteCartridge.newLink;
            sessionStorage.setItem("newLink", remoteCartridge.newLink);
          }
        }
      } catch (e) {
        console.log(e);
        functions = [{ name: "TRAITS", lines }];
      }

      sessionStorage.setItem("functions", JSON.stringify(functions));
    }
  }
};

const loadGhostCartridge = async (parent) => {
  const children = await getChildrenAll(parent);

  let collection = [
    "61860d439a36956028381989bf1e5006af89e738e55625fe699bb64608fb14d3i0",
    "51dd00e53419cb588f212d2b16fd15aef186ab0a77a9f9de5f67dd0d61301821i0",
    "1e31a6ecaa83615051aeb046b0f2bea607d6ce2a518e6ab239714638b0484bd3i0",
    "c17430a64d1e3aefa6f0236471a7ad8b99b6b3af2eac8627547b3fc7fc3c9b18i0",
    "180a98446b37983d77b573250bdb13a3b5a551f13fefc043bd7567e5d43a7163i0",
    "5e5aca17796c6755b9af9cbb579da9945872df0c4dd5612369ae3c483166c393i0",
    "31ab682c683dd4fb83564bad42a3e55b86f2e615ba4db0a7982063b15e8e4281i0",
    "066f9926a2533fedcf5ab7a8b7473cc089ee4891c66bc55d9b8eebf1536e0421i0",
    "7300e88958791ab382f867c568d06c706c79f95f509fd676b85aa1098c5a7265i0",
    "5468f0e015481a3bf7d5af4e22c08691d355cf876c3a0c93ef6d828b11b2cb5bi0",
    "2628f1461436e3eba21971760a2da52da18bf72e8525c3da1c3e53d416ab2e95i0",
    "6495b3ac8090dd8cb6af12d5077d1100bace6aa774d3a47049479d6a32440024i0",
    "152c8032d79a3bc712e591da79d012a452879d09ea9569026d91f3e8d8d7764fi0",
    "8acd6b312cc6b943926d1a861278df5d30303e60c8d5567bb0c933dd1a9c1689i0",
  ];

  collection.push(...children);

  const collections = collection.map((id, index) => {
    return { ghostNumber: index + 1, InscriptionId: id };
  });

  sessionStorage.setItem("collections", JSON.stringify(collections));
};

async function main() {
  const metaData = await getMetadata();
  const satEndpoint = "sat.json"; //1940516875000000
  const parent =
    "24007ab87af4a1ade126b5add3d52cadce466a45754573040c57e2e55c69022ai0";
  let Link =
    "8f70ff05e1dcddc8b3db3ae60cb00860fefb036725a3cbdad692999a9b767aefi0";

  await loadCartridge(metaData, satEndpoint);

  const images = Object.entries(metaData.Attributes).map(
    ([key, value]) => Dictionary[key][value]
  );

  const dataUrl = await drawImagesOnCanvas(images);
  sessionStorage.setItem("inscriptionImage", dataUrl);
  var resultImage = document.createElement("img");
  resultImage.src = dataUrl;
  resultImage.addEventListener("click", navigateToHTML);
  document.body.appendChild(resultImage);

  if (metaData && metaData.Title) {
    document.title = metaData.Title;
  }

  const link = document.createElement("link");
  link.type = "image/png";
  link.rel = "icon";
  link.href = dataUrl;
  document.getElementsByTagName("head")[0].appendChild(link);

  await loadGhostCartridge(parent);

  function navigateToHTML() {
    window.location.href = `/content/${Link}`;
  }
}

main();
