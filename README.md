# Recursive Endpoints

Inscription location V1: `ef7689dc2f504f63f8d13356f8928a2fec097b3b014c9fe53a1d1ddb5952f5dbi0`
Inscription location V2: `89fbbeca30c87535f9db283da584006c90076f220dbf410a01985a1840e0ea0ci0`

To use in your inscription use script type module
Example import:

```html
<script type="module">
  import {
    getMetadata,
    getSatAt,
    getBlockHash,
  } from '/content/89fbbeca30c87535f9db283da584006c90076f220dbf410a01985a1840e0ea0ci0';
</script>
```

Author: Eloc

Description: Library for getting data off recursive endpoints

To run the test:

```
bun test
```

# Function

- [getAll](#getall)
- [getId](#getid)
- [getInscription](#getinscription)
- [getMetadata](#getmetadata)
- [getSatAt](#getsatat)
- [getSatPage](#getsatpage)
- [getSatAll](#getsatall)
- [getChildrenPage](#getchildrenpage)
- [getChildrenAll](#getchildrenall)
- [getBlockInfo](#generateblockinfo)
- [getBlockHash](#getblockhash)
- [getBlockHeight](#getblockheight)
- [getBlockTime](#getblocktime)

---

### `getAll`

Fetches all information about an inscription, including children, sat inscriptions, metadata, and its ID. Defaults to using the ID obtained from `getId()` if an `inscriptionId` is not provided.

**Parameters:**

- `inscriptionId` - Inscription to get all information about. Defaults to the ID of the page running it if none is given.
- `origin` - The origin for the fetch.

**Returns:**

```ts
Promise<{
  inscription: {
    charms: Array<
      | 'coin'
      | 'cursed'
      | 'epic'
      | 'legendary'
      | 'lost'
      | 'nineball'
      | 'rare'
      | 'reinscription'
      | 'unbound'
      | 'uncommon'
      | 'vindicated'
    >;
    content_type: string;
    content_length: number;
    fee: number;
    height: number;
    number: number;
    output: string;
    sat: null | string;
    satpoint: string;
    timestamp: number;
    value: number;
  } | null;
  children: Array<string>;
  satIds: Array<string>;
  metadata: Object | null;
  id: string;
}>;
```

A promise that resolves with all the information about the inscription.

**Example:**

```js
import { getInscriptionAll } from '/content/89fbbeca30c87535f9db283da584006c90076f220dbf410a01985a1840e0ea0ci0';
const allInfo = await getInscriptionAll();
```

### `getId`

Retrieves the inscription ID from the current page's URL. Assumes the URL follows a structure like `/content/<id>` or `/preview/<id>`. The ID is expected to be the third segment in the URL path.

**Returns:**

```ts
string;
```

The extracted ID.

**Example:**

```javascript
import { getId } from '/content/89fbbeca30c87535f9db283da584006c90076f220dbf410a01985a1840e0ea0ci0';
const myId = getId();
```

### `getInscription`

Fetches information about an inscription. Defaults to using the ID obtained from `getId()` if an `inscriptionId` is not provided.

**Parameters:**

- `inscriptionId` - Inscription to get information about. Defaults to the ID of the page running it if none is given.
- `origin` - The origin for the fetch.

**Returns:**

```ts
Promise<{
  charms: Array<
    | 'coin'
    | 'cursed'
    | 'epic'
    | 'legendary'
    | 'lost'
    | 'nineball'
    | 'rare'
    | 'reinscription'
    | 'unbound'
    | 'uncommon'
    | 'vindicated'
  >;
  content_type: string;
  content_length: number;
  fee: number;
  height: number;
  number: number;
  output: string;
  sat: null | string;
  satpoint: string;
  timestamp: number;
  value: number;
} | null>;
```

A promise that resolves with info about the inscription or null if the inscription was not found.

**Example:**

```js
import { getInscription } from '/content/89fbbeca30c87535f9db283da584006c90076f220dbf410a01985a1840e0ea0ci0';
const inscription = await getInscription();
```

### `getMetadata`

Fetches metadata information about an inscription. Defaults to using the ID obtained from `getId()` if an `inscriptionId` is not provided.

**Parameters:**

- `inscriptionId` - Inscription to get metadata. Defaults to the ID of the page running it if none is given.
- `origin` - The origin for the fetch

**Returns:**

```ts
Promise<Object>;
```

A promise that resolves with the processed metadata. The metadata is a JavaScript object parsed from a CBOR-encoded response.

**Warning:** Cbor-x decode might not have full coverage of decoding to json. Always test your response is like you intend before inscribing.

**Example:**

```javascript
import { getMetadata } from '/content/89fbbeca30c87535f9db283da584006c90076f220dbf410a01985a1840e0ea0ci0';
const metadata = await getMetadata();
```

### `getSatAt`

Fetches a single inscription on a sat based on index. If index is not provided, it defaults to -1, which fetches the most recent inscription.

**Parameters:**

- `sat` - The sat to fetch the inscription from.
- `index` - The index of the inscription to fetch. Defaults to -1.
- `origin` - The origin for the fetch.

**Returns:**

```ts
Promise<{ id: string }>;
```

A promise that resolves with the fetched inscriptionId.

**Example:**

```javascript
import { getSatAt } from '/content/89fbbeca30c87535f9db283da584006c90076f220dbf410a01985a1840e0ea0ci0';
const sat = 1;
const newestSatInscription = await getSatAt(sat);
```

### `getSatPage`

Fetches the page data for a specific SAT at a given page number.

**Parameters:**

- `sat` - The SAT number to fetch the page data for.
- `page` - The page number to fetch. Defaults to 0.
- `origin` - The origin for the fetch.

**Returns:**

```ts
Promise<{ ids: Array<string>; more: boolean; page: number }>;
```

**Example:**

```javascript
import { getSatPage } from '/content/89fbbeca30c87535f9db283da584006c90076f220dbf410a01985a1840e0ea0ci0';
const sat = 1;
const satFirst100 = await getSatPage(sat);
```

### `getSatAll`

Fetches all the inscriptions on a sat. The function fetches the inscriptions in pages, and continues fetching until there are no more pages.

**Parameters:**

- `sat` - The sat to fetch the inscriptions from.
- `origin` - The origin for the fetch.

**Returns:**

```ts
Promise<Array<string>>;
```

A promise that resolves with an array of the IDs of the inscriptions.

**Example:**

```javascript
import { getSatAll } from '/content/89fbbeca30c87535f9db283da584006c90076f220dbf410a01985a1840e0ea0ci0';
const satAll = await getSatAll();
```

### `getChildrenPage`

Fetches the children of a given inscription. If no inscription ID is provided, it defaults to using the ID obtained from `getId()`.

**Parameters:**

- `inscriptionId` - The ID of the inscription to get the children of. Defaults to the ID of the page running it if none is given.
- `page` - The page number to fetch the children from.
- `origin` - The origin for the fetch.

**Returns:**

```ts
Promise<{ ids: Array<string>; more: boolean; page: number }>;
```

**Example:**

```javascript
import { getChildrenPage } from '/content/89fbbeca30c87535f9db283da584006c90076f220dbf410a01985a1840e0ea0ci0';
const getFirst100Children = await getChildrenPage();
```

### `getChildrenAll`

Fetches all the children of a given inscription.

**Parameters:**

- `inscriptionId` - The ID of the inscription to get the children of. Defaults to the ID obtained from `getId()`.
- `origin` - The origin for the fetch.

**Returns:**

```ts
Promise<Array<string>>;
```

A promise that resolves with an array of the IDs of the children.

**Example:**

```javascript
import { getChildrenAll } from '/content/89fbbeca30c87535f9db283da584006c90076f220dbf410a01985a1840e0ea0ci0';
const allChildren = await getChildrenAll();
```

### `getBlockInfo`

Fetches information about a specific block by block height or block hash.

**Parameters:**

- `blockInfo` - The block height or block hash to get information about.
- `origin` - The origin for the fetch.

**Returns:**

```ts
{
  Promise<{
    bits: number;
    chainwork: number;
    confirmations: number;
    difficulty: number;
    hash: string;
    height: number;
    median_time: number;
    merkle_root: string;
    next_block: string;
    nonce: number;
    previous_block: string;
    target: string;
    timestamp: number;
    transaction_count: number;
    version: number;
  } | null>;
}
```

A promise that resolves with the information about the block or null if not found.
**Example:**

```js
import { getBlockInfo } from '/content/89fbbeca30c87535f9db283da584006c90076f220dbf410a01985a1840e0ea0ci0';
const blockInfo = await getBlockInfo(0);
```

### `getBlockHash`

Fetches the block hash at a given block height.

**Parameters:**

- `height` - The height of the block to get the hash of.
- `origin` - The origin for the fetch.

**Returns:**

```ts
Promise<string>;
```

A promise that resolves with the hash of the block.

**Example:**

```javascript
import { getBlockHash } from '/content/89fbbeca30c87535f9db283da584006c90076f220dbf410a01985a1840e0ea0ci0';
const findHash = await getBlockHash(height);
```

### `getBlockHeight`

Fetches the latest block height.

**Parameters:**

- `origin` - The origin for the fetch.

**Returns:**

```ts
Promise<number>;
```

A promise that resolves with the height of the latest block.

**Example:**

```javascript
import { getBlockHeight } from '/content/89fbbeca30c87535f9db283da584006c90076f220dbf410a01985a1840e0ea0ci0';
const bh = await getBlockHeight();
```

### `getBlockTime`

Fetches the UNIX time stamp of the latest block.

**Parameters:**

- `origin` - The origin for the fetch.

**Returns:**

```ts
Promise<number>;
```

A promise that resolves with the UNIX time stamp of the latest block.

**Example:**

```javascript
import { getBlockTime } from '/content/89fbbeca30c87535f9db283da584006c90076f220dbf410a01985a1840e0ea0ci0';
const blockTime = await getBlockTime();
```
