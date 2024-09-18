<template>
    <div class="container winnie-about mt-5 px-3 px-lg-0">
        <!-- Side Navigation for Desktop -->
        <nav class="side-nav fs-5 fw-bold">
            <ul>
              <li><a href="#aboutOneChance">About OneChance</a></li>
              <li><a href="#builtOnBlast">Built on Blast</a></li>
              <li><a href="#keepinIt">Keepin’ it 100</a></li>
              <li><a href="#getPoints">Get Points, Get Paid</a></li>
              <li><a href="#theGamesSuite">The Games Suite</a></li>
              <li><a href="#oneChance">OneChance</a></li>
              <li><a href="#pokeTheBear">Poke the Bear</a></li>
            </ul>
        </nav>

        <!-- Main Content -->
        <div class="container content">
          <h1 class="mb-3 fw-bold d-inline d-md-none">About OneChance</h1>
            <div class="accordion accordion-flush d-md-none" id="accordionFlushExample">
                <div class="accordion-item">
                  <h2 class="accordion-header fw-bold" id="flush-headingOne">
                    <button class="accordion-button collapsed pb-0 px-0 fs-5 fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                        <i class="fa-solid fa-list pe-2"></i>On this page
                    </button>
                  </h2>
                  <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body fs-5 fw-bold">
                        <ul>
                            <li class="my-2"><a href="#aboutOneChance">About OneChance</a></li>
                            <li class="my-2"><a href="#builtOnBlast">Built on Blast</a></li>
                            <li class="my-2"><a href="#keepinIt">Keepin’ it 100</a></li>
                            <li class="my-2"><a href="#getPoints">Get Points, Get Paid</a></li>
                            <li class="my-2"><a href="#theGamesSuite">The Games Suite</a></li>
                            <li class="my-2"><a href="#oneChance">OneChance</a></li>
                            <li class="my-2"><a href="#pokeTheBear">Poke the Bear</a></li>
                          </ul>
                    </div>
                  </div>
                </div>
              </div>

            <div id="aboutOneChance" class="my-5">
            <h1 class="fw-bold d-none d-md-inline">About OneChance</h1>
            <p class="mt-2">Welcome to a new frontier of on-chain gaming. OneChance Games exists for one reason only: to get degens paid.<br><br>Win or lose in our suite of crypto games, you’re getting rewarded. With every move you make, your pile of Points only grows — and your leaderboard ranking increases. Complete daily tasks and hit new milestones to progress, then take home your cut of a huge reward at the end of every season.</p>
            </div>
            <div id="builtOnBlast" class="my-5">
            <h2 class="mb-3 fw-bold">Built on Blast</h2>
            <p>We’ll level with you: you just can’t get the kinds of high-octane thrills OneChance Games delivers on a regular ol’ blockchain. To build the ultimate gaming hub, we’ve turned to Blast’s layer two solution.<br><br>Why? For starters, it’s Fast with a capital F. Forget block times, congestion and all that nonsense. Once you’ve bridged over from Ethereum, you’re in a whole new world of light-speed transactions and fast-paced gameplay.<br><br>But wait, there’s more: gas fees are a fraction of what you pay on the base chain. And of those you do pay, 100% gets passed along to developers on Blast.<br><br>Oh, and did we mention that the whole ecosystem is dripping with incentives?</p>
            </div>
            <div id="keepinIt" class="my-5">
            <h2 class="mb-3 fw-bold">Keepin’ it 100</h2>
            <p>We said you’re getting rewarded, and, on God, we mean it. Our players get:<br><br>
                <ul>
                    <li>A portion of the fees generated</li>
                    <li>100% of native yield</li>
                    <li>100% of Blast incentives</li>
                </ul>
                <br><br>
                Not enough? Fine. We’ll throw in $OneChance tokens, too. More on that soon </p>
            </div>
            <div id="getPoints" class="my-5">
                <h2 class="mb-3 fw-bold">Get Points, Get Paid</h2>
                <p>Please no not more points I can’t take it anymore. Trust us — OneChance Points are far from your average rewards system.<br><br>Pretty much everything you do on the platform earns you Points: playing games, completing quests, hitting various milestones. Of course, we have a soft spot for degens, so the higher-risk moves will yield the most Points.<br><br>At the end of every season, you’ll cash in for massive $OneChance rewards — our very own, Blast-native token.</p>
            </div>
            <div id="theGamesSuite" class="my-5">
                <h2 class="mb-3 fw-bold">The Games Suite</h2>
                <p>Predict whether crypto prices will increase (MOON) or decrease (DOOM) during a 60-second period. Guess correctly to win!<br><br>In MOON or DOOM, you can speculate on the outcomes of ETHUSD and BTCUSD markets. Accurate price information is pulled directly from Pyth’s feeds.</p>
            </div>
            <div id="oneChance" class="my-5">
                <h2 class="mb-3 fw-bold">OneChance</h2>
                <p>A high-stakes, winner-takes-all battle royale. In OneChance, players add crypto to a shared pot — and the more they add, the greater their chance of winning. Essentially, a player’s odds are proportionate to their share of the total pot.<br><br>When deposits close, the wheel spins, before landing on a player. That lucky mf takes home everything in the pot (minus a small fee), while the losers go home empty-handed. They’ll still get Points as a consolation prize, though.<br><br>OneChance uses Gelato for randomness, ensuring that results are always transparent and provably fair.</p>
            </div>
            <div id="pokeTheBear" class="my-5">
                <h2 class="mb-3 fw-bold">Poke the Bear</h2>
                <p>Can’t cope with the OneChance heat? You’re going to love venturing into a cave with a violent, psycho bear.<br><br>Joking aside, Poke the Bear is lower-risk than OneChance (though note that this comes with a lower reward). The premise is simple: players pay a fee and enter a cave where a sleeping bear resides.<br><br>You’ll each take it in turns to poke this beast, praying with every turn that he doesn’t wake up. Inevitably, though, he will — and he’ll maul the person responsible. Meanwhile, the victim’s fee will be divided up and split among the survivors.<br><br>Once again, Poke the Bear uses Gelato for provable fairness.</p>
            </div>
        </div>
    </div> 
</template>

<script setup></script>

<style scoped>
.winnie-about .side-nav {
    position: fixed;
    top: 200px;
    left: 200px;
    height: 100%;
    width: 250px;
    padding-top: 20px;
    background-color: transparent;
    display: none;
  }
.winnie-about .side-nav a {
    display: block;
    padding: 10px 15px;
    color: #F8F8F8;
    text-decoration: none;
  }

.winnie-about .side-nav a:hover {
    color: #FCD535;
  }
.winnie-about .content {
    margin-left: 0;
  }
  @media (min-width: 768px) {
    .winnie-about .side-nav {
      display: block;
    }
    .winnie-about .content {
      margin-left: 250px;
    }
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    .winnie-about.container {
        width: 80%;
    }
  }
  @media (min-width: 991.98px) and (max-width: 1199.98px) {
    .winnie-about.container {
        width: 70%;
    }
  }
  @media (min-width: 768px) and (max-width: 1699.98px) {
    .winnie-about .side-nav {
        left: 80px;
    }
  }

  .winnie-about .accordion {
    --bs-accordion-btn-bg: transparent;
    --bs-accordion-bg: transparent;
    --bs-accordion-color: #F8F8F8;
    --bs-accordion-btn-color: #F8F8F8;
    --bs-accordion-active-bg: transparent;
    --bs-accordion-btn-focus-box-shadow: none;
    --bs-accordion-border-color: transparent;
  }

  .winnie-about .accordion a {
    color: #F8F8F8;;
  }

  .winnie-about .accordion-button:not(.collapsed){
    color: #F8F8F8;
  }

  .winnie-about .fa-list {
    color: #F8F8F8;
  }

  .winnie-about .side-nav a {
    border-right: 1px solid #F8F8F8;
}

.winnie-about .side-nav a:hover,
.winnie-about .side-nav a:focus {
  border-right: 3px solid #FCD535;
}

.winnie-about .accordion-body ul {
    border-right: 1px solid #F8F8F8;
}

.winnie-about .accordion-body li:hover,
.winnie-about .accordion-body li:focus {
  border-right: 3px solid #FCD535;
}

.winnie-about .accordion-body li:hover a,
.winnie-about .accordion-body li:focus a {
  color: #FCD535;
}

.winnie-about p {
  color: #bbb;
}

</style>
