import { burns } from "@/mocks/burns"
import { Territory } from "@/models/Territory"

export class TerritoryService {
  getBurns() {
    return Promise.resolve(burns.map(i => new Territory(i)))
  }
}
