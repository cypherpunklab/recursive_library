/**
 * @title Recursive Endpoints
 * @author Eloc
 * @description Library for getting data off recursive endpoints
 */
import { decode } from './content/cbor-x.mjs';

/**
 * @description Retrieves the inscription ID from the current page's URL.
 * Assumes the URL follows a structure like `/content/<id>` or `/preview/<id>`.
 * The ID is expected to be the third segment in the URL path.
 *
 * @returns {string} The extracted ID.
 * @example
 * import { getId } from '/content/<ID_OF_THIS_INSCRIPTION>';
 * const myId = getId();
 */
export function getId() {
  let id = window.location.pathname.split('/')[2];
  return id;
}

/**
 * @description Fetches metadata information about an inscription.
 * Defaults to using the ID obtained from `getId()` if an `inscriptionId` is not provided.
 * @param {string} inscriptionId - Inscription to get metadata.
 *                                 Defaults to the ID of the page running it if none is given.
 * @param {string} origin - The origin for the fetch
 * @returns {Promise<{Object | null}>} A promise that resolves with the processed metadata or null if the metadata was not found.
 * @example
 * import { getMetadata } from '/content/<ID_OF_THIS_INSCRIPTION>';
 * const metadata = await getMetadata();
 */
export async function getMetadata(inscriptionId = getId(), origin = '') {
  try {
    const response = await fetch(`${origin}/r/metadata/${inscriptionId}`);
    if (!response.ok) {
      return null;
    }
    const json = await response.json();
    const byteArray = new Uint8Array(
      json.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
    );
    const buffer = byteArray.buffer;
    const jsonData = decode(new Uint8Array(buffer));
    return jsonData;
  } catch (error) {
    console.error('Error fetching metadata:', error);
  }
}

/**
 * @description Fetches a single inscription on a sat based on index.
 * If index is not provided, it defaults to -1, which fetches the most recent inscription.
 *
 * @param {string} sat - The sat to fetch the inscription from.
 * @param {number} index - The index of the inscription to fetch. Defaults to -1.
 * @param {origin} origin - The origin for the fetch.
 * @returns {Promise<{id: string}>} A promise that resolves with the fetched inscriptionId.
 * @example
 * import { getSatAt } from '/content/<ID_OF_THIS_INSCRIPTION>';
 * const sat = 1
 * const newestSatInscription = await getSatAt(sat);
 */
export async function getSatAt(sat, index = -1, origin = '') {
  const response = await fetch(`${origin}/r/sat/${sat}/at/${index}`);
  return response.json();
}

/**
 * @description Fetches the page data for a specific SAT at a given page number.
 *
 * @param {string} sat - The SAT number to fetch the page data for.
 * @param {number} page - The page number to fetch. Defaults to 0.
 * @param {origin} origin - The origin for the fetch.
 * @returns {Promise<{ids: Array<string>, more: boolean, page: number}>}
 * @example
 * import { getSatPage } from '/content/<ID_OF_THIS_INSCRIPTION>';
 * const sat = 1
 * const satFirst100 = await getSatPage(sat);
 */
export async function getSatPage(sat, page = 0, origin = '') {
  try {
    const response = await fetch(`${origin}/r/sat/${sat}/${page}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const ids = data.ids;
    const more = data.more;
    const pageData = data.page;

    return { ids, more, page: pageData };
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

/**
 * @description Fetches all the inscriptions on a sat.
 * The function fetches the inscriptions in pages, and continues fetching until there are no more pages.
 *
 * @param {string} sat - The sat to fetch the inscriptions from.
 * @param {origin} origin - The origin for the fetch.
 * @returns {Promise<Array<string>>} A promise that resolves with an array of the IDs of the inscriptions.
 * @example
 * import { getSatAll } from '/content/<ID_OF_THIS_INSCRIPTION>';
 * const satAll = await getSatAll();
 */
export async function getSatAll(sat, origin = '') {
  let ids = [];
  let more = true;
  let page = 0;

  while (more) {
    const result = await getSatPage(sat, page, origin);
    ids = ids.concat(result.ids);
    more = result.more;
    page++;
  }
  return ids;
}

/**
 * @description Fetches the children of a given inscription.
 * If no inscription ID is provided, it defaults to using the ID obtained from `getId()`.
 *
 * @param {string} inscriptionId - The ID of the inscription to get the children of.
 *                                 Defaults to the ID of the page running it if none is given.
 * @param {number} page - The page number to fetch the children from.
 * @param {origin} origin - The origin for the fetch.
 * @returns {Promise<{ids: Array<string>, more: boolean, page: number}>}
 * @example
 * import { getChildrenPage } from '/content/<ID_OF_THIS_INSCRIPTION>';
 * const getFirst100Children = await getChildrenPage();
 */
export const getChildrenPage = async (
  inscriptionId = getId(),
  page = 0,
  origin = ''
) => {
  let ids = [];
  let more = true;

  try {
    const response = await fetch(
      `${origin}/r/children/${inscriptionId}/${page}`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    ids = ids.concat(data.ids);
    more = data.more;
    page = data.page;
  } catch (error) {
    console.error('Error fetching data:', error);
    more = false;
  }
  return { ids, more, page };
};

/**
 * @description Fetches all the children of a given inscription.
 *
 * @param {string} inscriptionId - The ID of the inscription to get the children of.
 *                                 Defaults to the ID obtained from `getId()`.
 *
 * @param {origin} origin - The origin for the fetch.
 * @returns {Promise<Array<string>>} A promise that resolves with an array of the IDs of the children.
 * @example
 * import { getChildrenAll } from '/content/<ID_OF_THIS_INSCRIPTION>';
 * const allChildren = await getChildrenAll();
 */
export async function getChildrenAll(inscriptionId = getId(), origin = '') {
  let ids = [];
  let more = true;
  let page = 0;

  while (more) {
    const result = await getChildrenPage(inscriptionId, page, origin);
    ids = ids.concat(result.ids);
    more = result.more;
    page++;
  }
  return ids;
}
/**
 * @description Fetches the block hash at a given block height.
 *
 * @param {number} height - The height of the block to get the hash of.
 * @returns {Promise<string | null>} A promise that resolves with the hash of the block or null if 404.
 * @example
 * import { getBlockHash } from '/content/<ID_OF_THIS_INSCRIPTION>';
 * const findHash = await getBlockHash(height)
 */
export async function getBlockHash(height, origin = '') {
  const url = `${origin}/r/blockhash/${height}`;
  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error('Network response was not ok');
  }

  const hash = await response.text();
  return hash;
}

/**
 * @description Fetches the latest block height.
 * @param {origin} origin - The origin for the fetch.
 * @returns {Promise<number>} A promise that resolves with the height of the latest block.
 * @example
 * import { getBlockHeight } from '/content/<ID_OF_THIS_INSCRIPTION>';
 * const bh = await getBlockHeight();
 */
export async function getBlockHeight(origin = '') {
  try {
    const response = await fetch(`${origin}/r/blockheight`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const height = await response.text();
    return Number(height);
  } catch (error) {
    console.error('Error fetching block height:', error);
  }
}

/**
 * @description Fetches the UNIX time stamp of the latest block.
 * @param {origin} origin - The origin for the fetch.
 * @returns {Promise<number>} A promise that resolves with the UNIX time stamp of the latest block.
 * @example
 * import { getBlockTime } from '/content/<ID_OF_THIS_INSCRIPTION>';
 * const blockTime = await getBlockTime();
 */
export async function getBlockTime(origin = '') {
  try {
    const response = await fetch(`${origin}/r/blocktime`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const time = await response.text();
    return Number(time);
  } catch (error) {
    console.error('Error fetching block time:', error);
  }
}
