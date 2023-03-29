describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`)
    const user = {
      username: "wubba",
      name: "lubba",
      password: "dub dub",
    }
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user)
    cy.visit("")
  })

  it("login form is shown", function () {
    cy.get("#username")
    cy.get("#password")
    cy.get("#login-btn")
  })

  describe("login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("wubba")
      cy.get("#password").type("dub dub")
      cy.get("#login-btn").click()

      cy.contains("lubba logged in")
    })

    it("fails with the wrong credentials", function () {
      cy.get("#username").type("wubba")
      cy.get("#password").type("sdjfhsdjk")
      cy.get("#login-btn").click()

      cy.get(".error")
        .should("contain", "wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
    })
  })

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "wubba", password: "dub dub" })
    })

    it("a blog can be created", function () {
      cy.contains("new blog").click()
      cy.get("#title-input").type("Cronenberg")
      cy.get("#author-input").type("Morty Smith")
      cy.get("#url-input").type("https://ricknmorty.com")
      cy.get("#create-btn").click()

      cy.contains("Cronenberg")
    })
  })

  describe("logged in and blog created", function () {
    beforeEach(function () {
      cy.login({ username: "wubba", password: "dub dub" })

      cy.createBlog({
        title: "Cronenberg",
        author: "Morty Smith",
        url: "https://ricknmorty.com",
      })
    })

    it("a blog can be liked", function () {
      cy.get(".view-btn").click()
      cy.get(".like-btn").click()
      cy.contains("likes 1")
    })

    it("user can delete blog", function () {
      cy.get(".view-btn").click()
      cy.get(".remove-btn").click()
      cy.contains("Cronenberg").should("not.exist")
    })

    it("non-creator cannot see remove button", function () {
      const user = {
        username: "rikki",
        name: "tikki",
        password: "tavi",
      }
      cy.request("POST", `${Cypress.env("BACKEND")}/users`, user)

      cy.get("#logout-btn").click()
      cy.login({ username: "rikki", password: "tavi" })
      cy.get(".view-btn").click()
      cy.get(".remove-btn").should("not.exist")
    })
  })

  describe("logged in with multiple blogs created", function () {
    beforeEach(function () {
      cy.login({ username: "wubba", password: "dub dub" })

      cy.createBlog({
        title: "Cronenberg",
        author: "Morty Smith",
        url: "https://ricknmorty.com",
      })
      cy.createBlog({
        title: "Simplicity",
        author: "Jerry Smith",
        url: "https://jerryjerry.com",
      })
      cy.createBlog({
        title: "Evil Morty",
        author: "Rick Sanchez",
        url: "https://nothingmatters.com",
      })
    })

    it.only("blogs ordered by no. of likes", function () {
      cy.contains("Cronenberg").contains("view").click()
      cy.contains("Evil Morty").contains("view").click()
      for (let i = 0; i < 5; i++) {
        cy.contains("Cronenberg").contains("like").click()
        cy.wait(200)
      }
      for (let i = 0; i < 10; i++) {
        cy.contains("Evil Morty").contains("like").click()
        cy.wait(200)
      }
      cy.get(".blog").eq(0).should("contain", "Evil Morty")
      cy.get(".blog").eq(1).should("contain", "Cronenberg")
    })
  })
})
