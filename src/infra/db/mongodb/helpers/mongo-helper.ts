import { Collection, MongoClient } from "mongodb"

export const MongoHelper = {
  // @ts-ignore
  client: null as MongoClient,
  // @ts-ignore
  uri: null as string,

  async connect(uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect(): Promise<void> {
    await this.client.close()
    // @ts-ignore
    this.client = null
  },

  async getCollection(name: string): Promise<Collection> {
    if (!this.client || !this.client.isConnected()) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },

  map: (collection: any) => {
    const { _id, ...collectionWithoutId } = collection

    return Object.assign({}, collectionWithoutId, { id: _id })
  }
}
