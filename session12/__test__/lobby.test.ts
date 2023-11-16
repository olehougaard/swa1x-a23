import { nextTick } from 'vue'
import { describe, it, expect } from '@jest/globals'
import { mount } from '@vue/test-utils'

import Lobby from '../src/components/Lobby.vue'

describe("lobby", () => {
    const game = { gameNumber: 7, gameName:'test game', board: [[]], ongoing: false, inTurn: 'X'}
    function readGamesList() {
        return [game]
    }

    it("displays the games from the server", async () => {
        const api = {
            readGamesList
        }

        const wrapper = mount(Lobby, {
            global: {
                provide: {
                    'api': api
                }
            }
        })

        await nextTick()

        expect(wrapper.text()).toContain('test game')
    })

    it("calls the server with a click on join", async () => {
        let joined = -1
        const api = {
            readGamesList,
            joinGame(gameNumber: number) { joined = gameNumber }

        }

        const wrapper = mount(Lobby, {
            global: {
                provide: {api}
            }
        })

        await nextTick()

        wrapper.find(`#join${game.gameNumber}`).trigger('click')

        await nextTick()

        expect(joined).toBe(game.gameNumber)
    })
})
