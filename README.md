# OneTwoTrie, et un pas de plus vers l'écologie
Application permettant de mieux recycler ses déchets.
Ce site reprend un peu l'idée de consignesdetri.fr de Citeo mais avec un système de code-barres.
(À noter que ce site essaye aussi d'être le moins lourd possible !)
Uniquement disponible en France.
https://ott.vexcited.ml

1. [Intro](https://github.com/Vexcited/onetwotrie/#onetwotrie-et-un-pas-de-plus-vers-l%C3%A9cologie)
2. [Application PC](https://github.com/Vexcited/onetwotrie/#2-application-pc)
3. [Application Mobile (en cours de développement)](https://github.com/Vexcited/onetwotrie/#3-application-mobile)
4. [API](https://github.com/Vexcited/onetwotrie/#4-api)

### On a besoin d'aide !

Le fichier /api/recyclage.json continet toutes les consignes de tri pour chaque villes, mais le problème c'est que nous pouvons pas tous les rajoutter à la main car
- Nous n'avons pas le temps
- Nous ne connaissons pas toutes les consignes de tri de chaque ville

Donc si vous avez un peu de temps, merci d'essayer de remplir les consignes pour votre propre ville.
Explications des données:
```
"nom_de_la_ville": {
    "potbocalverre" => Les pots ou bocaux en verre
    "potyaourt" => Les pots de yaourt
    "briquealimentaire" => Les briques alimentaires (jus, lait, ...)
    "boitemetal" => Les boîtes en métal
    "papier" => Comme son nom, Papier
    "bouteilleplastique" => Bouteilles en plastique
    "bouteilleverre" => Bouteilles en verre
    "porcelaine" => Porcelaine (assiettes, ...)
    "boitecarton" => Boîtes en carton
    "emballageplastique" => Emballages plastiques (peut être des étuis aussi)
    "bouteillemetal" => Bouteilles en métal
    "canettealuminium" => Canettes [en aluminium]
}
```

Nous mentionnons tous les contributeurs à la fin de ce fichier.

## [2] Application PC

À la place de consulter https://ott.vexcited.ml à chaque fois, vous pouvez directement y accéder depuis l'application sur ordinateur.

Uniquement disponible sur Windows (actuellement...)

* [Dernières versions](https://github.com/Vexcited/onetwotrie/releases/)

## [3] Application Mobile
En cours de développement...

## [4] API
[Informations](https://vexcited.github.io/onetwotrie/api/)
URL => `https://vexcited.github.io/onetwotrie/api/product.html?{QUERY}`

### Credits
- [Collège Albert Calmette](http://www.clg-calmette.ac-limoges.fr/)
- [Invertime](https://github.com/Invertime)
