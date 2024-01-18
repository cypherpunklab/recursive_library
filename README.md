# Recursive Endpoints

Author: Eloc

Description: Library for getting data off recursive endpoints

### `getId()`

Retrieves the inscription ID from the current page's URL. Assumes the URL follows a structure like `/content/<id>` or `/preview/<id>`. The ID is expected to be the third segment in the URL path.

**Returns:** `string` - The extracted ID.

**Example:**

```javascript
import { getId } from '/content/<ID_OF_THIS_INSCRIPTION>';
const myId = getId();
```

### `getMetadata(inscriptionId, origin)`

Fetches metadata information about an inscription. Defaults to using the ID obtained from `getId()` if an `inscriptionId` is not provided.

**Parameters:**

- `inscriptionId` - Inscription to get metadata. Defaults to the ID of the page running it if none is given.
- `origin` - The origin for the fetch

**Returns:** `Promise<Object>` - A promise that resolves with the processed metadata. The metadata is a JavaScript object parsed from a CBOR-encoded response.

**Example:**

```javascript
import { getMetadata } from '/content/<ID_OF_THIS_INSCRIPTION>';
const metadata = await getMetadata();
```

### `getSatAt(sat, index, origin)`

Fetches a single inscription on a sat based on index. If index is not provided, it defaults to -1, which fetches the most recent inscription.

**Parameters:**

- `sat` - The sat to fetch the inscription from.
- `index` - The index of the inscription to fetch. Defaults to -1.
- `origin` - The origin for the fetch.

**Returns:** `Promise<{id: string}>` - A promise that resolves with the fetched inscriptionId.

**Example:**

```javascript
import { getSatAt } from '/content/<ID_OF_THIS_INSCRIPTION>';
const sat = 1;
const newestSatInscription = await getSatAt(sat);
```

### `getSatPage(sat, page, origin)`

Fetches the page data for a specific SAT at a given page number.

**Parameters:**

- `sat` - The SAT number to fetch the page data for.
- `page` - The page number to fetch. Defaults to 0.
- `origin` - The origin for the fetch.

**Returns:** `Promise<{ids: Array<string>, more: boolean, page: number}>`

**Example:**

```javascript
import { getSatPage } from '/content/<ID_OF_THIS_INSCRIPTION>';
const sat = 1;
const satFirst100 = await getSatPage(sat);
```

### `getSatAll(sat, origin)`

Fetches all the inscriptions on a sat. The function fetches the inscriptions in pages, and continues fetching until there are no more pages.

**Parameters:**

- `sat` - The sat to fetch the inscriptions from.
- `origin` - The origin for the fetch.

**Returns:** `Promise<Array<string>>` - A promise that resolves with an array of the IDs of the inscriptions.

**Example:**

```javascript
import { getSatAll } from '/content/<ID_OF_THIS_INSCRIPTION>';
const satAll = await getSatAll();
```

### `getChildrenPage(inscriptionId, page, origin)`

Fetches the children of a given inscription. If no inscription ID is provided, it defaults to using the ID obtained from `getId()`.

**Parameters:**

- `inscriptionId` - The ID of the inscription to get the children of. Defaults to the ID of the page running it if none is given.
- `page` - The page number to fetch the children from.
- `origin` - The origin for the fetch.

**Returns:** `Promise<{ids: Array<string>, more: boolean, page: number}>`

**Example:**

```javascript
import { getChildrenPage } from '/content/<ID_OF_THIS_INSCRIPTION>';
const getFirst100Children = await getChildrenPage();
```

### `getChildrenAll(inscriptionId, origin)`

Fetches all the children of a given inscription.

**Parameters:**

- `inscriptionId` - The ID of the inscription to get the children of. Defaults to the ID obtained from `getId()`.
- `origin` - The origin for the fetch.

**Returns:** `Promise<Array<string>>` - A promise that resolves with an array of the IDs of the children.

**Example:**

```javascript
import { getChildrenAll } from '/content/<ID_OF_THIS_INSCRIPTION>';
const allChildren = await getChildrenAll();
```

### `getBlockHash(height, origin)`

Fetches the block hash at a given block height.

**Parameters:**

- `height` - The height of the block to get the hash of.
- `origin` - The origin for the fetch.

**Returns:** `Promise<string>` - A promise that resolves with the hash of the block.

**Example:**

```javascript
import { getBlockHash } from '/content/<ID_OF_THIS_INSCRIPTION>';
const findHash = await getBlockHash(height);
```

### `getBlockHeight(origin)`

Fetches the latest block height.

**Parameters:**

- `origin` - The origin for the fetch.

**Returns:** `Promise<number>` - A promise that resolves with the height of the latest block.

**Example:**

```javascript
import { getBlockHeight } from '/content/<ID_OF_THIS_INSCRIPTION>';
const bh = await getBlockHeight();
```

### `getBlockTime(origin)`

Fetches the UNIX time stamp of the latest block.

**Parameters:**

- `origin` - The origin for the fetch.

**Returns:** `Promise<number>` - A promise that resolves with the UNIX time stamp of the latest block.

**Example:**

```javascript
import { getBlockTime } from '/content/<ID_OF_THIS_INSCRIPTION>';
const blockTime = await getBlockTime();
```
