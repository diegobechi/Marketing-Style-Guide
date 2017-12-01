<?php
	$page_title = 'Case Studies';
	$page_description = '';
	$page_keywords = 'case-studies';
	$page_class = 'case-studies';
	$page_active = 'case-studies';
?>
<?php include('templates/static/header.php'); ?>

<?php
	foreach ($_GET as $caseStudyDetail => $csValue) {
		$caseStudyDetail = key($_GET);
	    switch ($caseStudyDetail) {
	        case 'from-the-farmer' :
				$csCompany = 'from-the-farmer';
				$csSubType = 'Subscription Box';
				$csLogo = 'from-the-farmer_logo.png';
				$csImage = 'from-the-farmer_product.jpg';
				$csHeadshot = 'from-the-farmer_headshot.jpg';
				$csStat1no = '$50K'; $csStat1 = 'saved from switching from custom development to ReCharge app';
				$csStat2no = '10%'; $csStat2 = 'Average cart value increase in first 90 days';
				$csStat3no = '50'; $csStat3 = 'farmers whose business they helped expand';
				$csSummary = 'From the Farmer’s main product is Farmbox, a delivery of seasonal fruits and vegetables from regional partners. In order to grow average cart value, From the Farmer knew that they needed a recurring billing app that included the option to create a mixed cart of goods at checkout and turned to ReCharge. In the first 90 days of launching ReCharge’s mixed cart functionality, 25% of From the Farmer customers used the option, the average cart value grew by 10%, and over $50K of development cost was saved.';
				$csAbout = 'From The Farmer co-founders, Jason and Nick, attended the University of Denver where they were bonded by their love of local foods and cooking. Out of an ambition to not work in the corporate world, they decided to create a company emphasising their shared passion - food - and how it brings people together. They knew that there were other big-box companies delivering brand-name groceries, but saw an opportunity to focus on just a few local purveyors who grew and created exceptional produce and provisions. In 2010, From The Farmer was born. Their main product is FarmBox, a delivery of seasonal fruits and vegetables from regional farm partners. ';
				$csExecutive = 'Jason Lundberg'; $csExecTitle = 'Co-Founder';
				$csQuote1 = '“After installing ReCharge, we were able to immediately see a cost savings of $50K per year of development costs”';
				$csChallenge = '<p>From the Farmer co-founder, Jason Lundberg, realized early on that Farmbox customers usually fall into one of two segments: young professionals and small families. “As it turns out,” Jason noted, “both segments are passionate about knowing the origin of their food and having the ability to customize their FarmBox deliveries.” </p><p>As the company started to take off in Washington, D.C. and Baltimore, Jason decided to give his customers a bit more functionality, which would also give From the Farmer a bit more revenue.</p><p> “We wanted to grow average cart value and the easiest way to do that was to add the option to create a mixed cart of goods at checkout.” With a mixed cart option, customers would then be able to purchase a regular Farmbox plus add-ons like gluten-free bread or a dozen eggs. Most importantly for Jason, that meant happy customers.</p>';
				$csQuote2 = '“We migrated 4,000 subscribers and had to ensure we were maintaining the same customer experience.”';
				$csResults = '<p>From the Farmer moved off their custom Ruby on Rails site in 2016 and moved forward with creating a Shopify store. Jason decided to install ReCharge once he discovered it was the only recurring billing app in the Shopify App Store which offered mixed cart functionality. </p><p>Once the installation was complete, From the Farmer immediately saw a reduction in costs. “Previously, we had a large expense allocated towards building and maintaining our site. After switching to Shopify and installing ReCharge, we were able to see a cost savings of approximately $50K per year of development costs.”</p><p>As expected, average cart values started to rise. To date, about 25% of Farmbox customers have taken advantage of the mixed cart option to add items like classic Bloody Mary mix and hazelnut spread to their weekly delivery. From the Farmer’s business was able to grow and has helped 50 East Coast farmers expand their own operations. </p><p>From the Farmer looks forward to the future with ReCharge and plans to continue to leverage its technology to take their subscription business to the next level.</p>';
	            break;

	        case 'pusheen-box' :
				$csCompany = 'pusheen-box';
				$csSubType = 'Subscription Box';
				$csLogo = 'pusheen-box_logo.svg';
				$csImage = 'pusheen-box_product.jpg';
				$csHeadshot = 'pusheen-box_headshot.jpg';
				$csStat1no = '66%'; $csStat1 = 'subscription growth in 3 months after switching to ReCharge ';
				$csStat2no = '2,400'; $csStat2 = 'record # of subscribers who subscribed to a PusheenBox in one day';
				$csStat3no = '36%'; $csStat3 = 'of users love Pusheen so much they signed up for the annual plan';
				$csSummary = 'Brooklyn-based agency, Simplistic, was approached by a large licensing company to help build a subscription box website for a popular cartoon cat, Pusheen. Their team then started an extensive search for the right recurring billing app that could scale with anticipated sales growth. After receiving a solid recommendation from the Shopify Plus team, they decided to install ReCharge. PusheenBox was so successful that Simplistic has built subscription box businesses for three additional brands.';
				$csAbout = 'Simplistic, a Shopify Plus preferred partner, is a Brooklyn-based agency agency that specializes in full online commerce, from custom design and development to customer service and in-house fulfillment. The company, located in New York and Connecticut, has created over 500 eCommerce experiences for stores like The Ellen Show, My M&Ms, Nine West and more.  ';
				$csExecutive = 'Andrew Gordon'; $csExecTitle = 'Vice President';
				$csQuote1 = '“Clayton in customer service was incredible for our development team and the client. It’s been the best part of working with ReCharge.”';
				$csChallenge = '<p>The story all starts with a chubby cartoon cat named Pusheen who built an online empire. After being created by artists Clare Belton and Andrew Duff as a character in their webcomic “Everyday Cute” in May 2010, the Pusheen cartoon became a popular Tumblr destination for fans.</p><p>In early 2016 Andrew Gordon and his team at Simplistic were approached by a licensing company, CultureFly, to help build a subscription box website for Pusheen. CultureFly had successful previous experience working on licensing characters from TV shows and movies and turning them into official products to sell to Target, Kohl’s and other retail giants. The Pusheen subscription box would be CultureFly’s first foray into the subscription side of eCommerce. </p><p>Originally, the site was built on Pinnacle Cart using Authorize.net payments. But after realizing they needed a more robust subscription engine to power their store and receiving a solid recommendation from the Shopify Plus team, Andrew decided to switch to ReCharge.</p>';
				$csQuote2 = '“We’ve now configured our customer portal settings to make it easy for customers to manage their subscriptions.”';
				$csResults = '<p>One of the biggest challenges the Simplistic team faced at the time included moving 6,000+ subscribers to ReCharge. Clayton Du from ReCharge’s customer success team partnered with Andrew’s team to safely and securely migrate PusheenBox customers. Andrew noted, “Clayton was incredible for our development team and the client. It’s been the best part of working with ReCharge.” </p><p>After clearing the hurdles of the migration, Simplistic’s next step was to customize the subscriptions they offered. The team created options for both quarterly and annual subscriptions and set each to be auto-renew, which further boosts recurring revenue. According to Andrew, “Configuring the ReCharge rules was incredible easy and painless - it’s been a great tool for us.”</p><p>In addition, Simplistic was able to give PusheenBox customers control over their own subscription settings. “The old platform we used didn’t have an interface for customers to manage subscriptions. We’ve now configured the ReCharge customer portal settings to make it easy for customers to change inputs like billing address and credit card info.”  </p><p>For Andrew and the Simplistic team, the subscription box horizon looks bright! They recently launched the wildly popular NickBox and have plans to partner with CultureFly to roll out additional brands just in time for the 2016 holiday season.</p>';
	            break;

	        case 'clearly-filtered' :
				$csCompany = 'clearly-filtered';
				$csSubType = 'Refill';
				$csLogo = 'clearly-filtered_logo.png';
				$csImage = 'clearly-filtered_product.png';
				$csHeadshot = 'clearly-filtered_headshot.jpg';
				$csStat1no = '70%'; $csStat1 = 'of our transactions are through ReCharge';
				$csStat2no = '$100K'; $csStat2 = 'in revenue after launching the filter 3-pack as a new subscription item';
				$csStat3no = '50%'; $csStat3 = 'of new customers convert to VIP subscription program';
				$csSummary = 'On their mission to provide clean, safe drinking water, Clearly Filtered realized they needed a more robust app to meet the needs of a growing product line. After switching to ReCharge, subscriptions grew to represent over 70% of their business.  With ReCharge’s options, they were also able to launch a 3-pack filter subscription, resulting in $100k of new revenue.';
				$csAbout = 'Clearly Filtered’s mission is to provide clean, safe drinking water to people all over the world. They believe that clean water is a basic human right and they intend on doing everything that they can to make sure that people don’t go thirsty. The company sell pitchers, filters and water bottles and launched subscription products over five years ago. Their corporate team of six people is located in Orange County, California. ';
				$csExecutive = 'Ryan Fair'; $csExecTitle = 'Head of Digital Marketing';
				$csQuote1 = '“We are able to cut down on the amount of time my team services smaller requests so they could focus on more complex customer questions.”';
				$csChallenge = '<p>According to their head of digital marketing, Ryan Fair, the typical customer is someone who is looking for an easy and sustainable approach to ensure they have clean water. “For us it’s someone who is well-versed in the health aspects of water filtration and someone who wants to save money and receive products in a timely fashion to not only ensure them clean water but also remind them to change the filter.” </p><p>Though they originally started on WordPress over five years ago, using Authorize.net for payments and Premium Webcart for recurring billing, Ryan knew he needed a more robust app to meet the needs of his growing product line. He spent two months researching different platforms and concluded the company should migrate off of WordPress to Shopify. </p><p>Ryan then started to compare recurring billing apps, which quickly ended after talking to the ReCharge team about his vision of the ideal customer experience. He knew ReCharge was the app to leverage because of one main reason - the ability to customize. “You don’t see a lot of apps online that offer as much customization as ReCharge.”</p>';
				$csQuote2 = '“Without ReCharge’s reporting tools I wouldn’t be able to make forecasting and inventory decisions.”';
				$csResults = '<p>Clearly Filtered’s customers are now able to manage their own subscriptions through ReCharge’s customer portal. Options include the ability to pause their subscription, change billing details, as well as change an upcoming order date. “Customers being able to manage their own accounts is huge for our customer success team. We are able to cut down on the amount of time my team services smaller requests so they could focus on more complex questions.”</p><p>Additionally, Ryan and his team rely heavily on the reporting ReCharge provides. “The feature we use the most is the 30-60-90 day projected revenue stats to forecast how many orders are going to come through the door. We then flip those numbers to my operations team. Without these tools I wouldn’t be able to make those types of inventory decisions.”</p><p>Clearly Filtered has gone all-in with the ReCharge app and it’s paying off. Excited about the  ability to quickly add subscription products and test them, Clearly Filtered launched a new 3-pack filter subscription earlier this year. The launch resulted in over $100K in revenue in the first 90 days. </p><p>For Ryan, the biggest benefit was ReCharge’s customer success team. “I’ve had the hardest questions in the world and they’ve done the absolute best to help - even when I stumped them.” </p>';
	            break;

	        case 'short-par-4' :
				$csCompany = 'short-par-4';
				$csSubType = 'Subscription Box';
				$csLogo = 'short-par-4_logo.png';
				$csImage = 'short-par-4_product.jpg';
				$csHeadshot = 'short-par-4_headshot.jpg';
				$csStat1no = '100%'; $csStat1 = 'month over month growth since starting';
				$csStat2no = '<div style="line-height:25px;font-size:17px;padding-top:20px;">6-9 months</div>'; $csStat2 = 'lifetime customer value';
				$csStat3no = '#1'; $csStat3 = 'fastest growing golf appareal company in the world';
				$csSummary = 'Stealth Venture Labs worked with their client, ShortPar4, to migrate them off of Magento and on to the Shopify platform. The subscription box company was able to make the switch in under one month and scale to become the fastest-growing golf apparel company in the world. ';
				$csAbout = 'Stealth Venture Labs is an operating incubator for subscription commerce companies that focuses on accelerating growth for subscription box companies through bringing a world class team of marketing executives, media buyers, content creators and graphics producers to execute along side its partner entrepreneurs. ';
				$csExecutive = 'Brent Freeman'; $csExecTitle = 'Founder & President';
				$csQuote1 = '“It was clear from week one of relaunching the ShortPar4 site that the simplicity of the Shopify ecosystem, along with the ReCharge app and an in-depth understanding of direct marketing ecosystems, led to immediate success.”';
				$csChallenge = 'In 2014, the year Bubba Watson won his second Masters Golf Tournament, ShortPar4 was launched. The idea for the company sprouted from a group of friends who were serious golfers and prided themselves on wearing trending golf apparel for tournaments. Due to their stature in the golf tournament sphere they had access to select styles. So, one day they thought, “wouldn’t it be cool if there was a Trunk-club stylist for golf?” and decided to test the concept.<br><br>The first iteration of ShortPar4 consisted of sending 5-7 pieces of styled clothing to customers and charging them for the pieces they kept. The initial concept fell flat on the market and operationally it was incredibly complex. In addition, the site was built on Magento and any complex changes cost $5K a pop. <br><br>After discovering they needed to pivot, the ShortPar4 founders partnered with Brent Freeman and his team at Stealth Venture Labs to consult on how to best evolve the company. Brent studied the ShortPar4 business and suggested a box-of-the-month concept: $100 worth of apparel for $49 each month. “The new pivot made it logistically simple and easy for customers to understand,” he said. <br><br>The Stealth team took the reigns on development and suggested a move to Shopify and employing a new recurring billing engine. “We had looked at other options for recurring billing but we ultimately chose ReCharge because of the ease of integration and simple interface at the time.” ';
				$csQuote2 = '“You’re only as good as your last box. If you ship subpar product, you’re going to have a massive exodus.”';
				$csResults = '<p>Stealth launched the site within a matter of four weeks. Brent admits, “It was clear from week one of relaunching the site in February 2015 that the simplicity of the Shopify ecosystem, along with the ReCharge app and an in-depth understanding of direct marketing ecosystems, led to immediate success.” Through optimizing Facebook ads, conversion funnels, a robust email strategy, Stealth was able to make ShortPar4 the fastest growing golf company in the world.<br><br>According to Brent, “When we launched, within a matter of days, we had more members in one day than the company had in the entire previous year.” ShortPar4 is now manufacturing their own apparel and moving tens of thousands of units to consumers, more than many big box retailers. <br><br>But, the Stealth and ShortPar4 teams never get too comfortable. Brent asserts, “You’re only as good as your last box. If you ship subpar product, you’re going to have a massive exodus. We’ve been able to use sophisticated merchandising techniques so customers see that we’re keeping the product fresh without being redundant.”</p>';
	            break;
	        case 'hubble' :
				$csCompany = 'hubble';
				$csSubType = 'Refills';
				$csLogo = 'hubble_logo.png';
				$csImage = 'hubble_product.jpg';
				$csHeadshot = 'hubble_headshot.jpg';
				$csStat1no = '17k'; $csStat1 = 'acquired over 17k customers in first 3 months';
				$csStat2no = '$1mm'; $csStat2 = 'run rate increases by $1mm each month';
				$csStat3no = '600'; $csStat3 = 'over 600 orders processed per day';
				$csSummary = 'Hubble knew they needed custom reporting and strong analytics. That\'s why Hubble used ReCharge. Within the first three months of using ReCharge, Hubble was able to gain more than 17,000 customers, process more than 600 orders daily and increase its run rate by $1 million on a monthly basis.';
				$csAbout = 'Hubble is the first brand of contacts lenses sold directly to consumers via an eCommerce, subscription-only model. After extensive research into supply chains and entry into a tough regulatory environment, the company launched in November 2016. Today, it offers customers FDA-approved daily contact lenses for $30 per month that are directly delivered to customers\' doorsteps under the Hubble branding. ';
				$csExecutive = 'Paul Rodgers'; $csExecTitle = 'Hubble CTO';
				$csQuote1 = '“I sent a slew of JavaScript API questions to the ReCharge team, and they were able to quickly respond with answers. As a developer, it made me feel comfortable to move forward with their product.”';
				$csChallenge = 'As a venture-backed company, strong analytics and optimized conversions became a paramount need for Hubble. Hubble Contacts\' Chief Technology Officer, Paul Rodgers, was tasked with designing an efficient checkout experience and custom reporting. The founders wanted to eliminate the cart pages, altogether as well as create a one-page checkout for subscriptions.” ';
				$csQuote2 = '“Every day at 4 a.m., we have a job that downloads all the customer data from the ReCharge API and then creates SQL scripts for us to plug into our reporting.”';
				$csResults = '<p>To accomplish the job, Paul utilized two APIs. According to Paul, "It\'s a complex setup — instead of using various product pages, we have a custom flow that creates a cart with JavaScript and utilizes a completely separate API to access a doctor\'s information we need to verify prescriptions."</p><p>Reporting was the next item Paul needed to tackle on his list. To get this handled, Paul took advantage of the ReCharge API to produce a retention report daily that demonstrates how each cohort performs on a daily basis. Paul notes that "this helps us see how changes to the site, the shipping price, or anything else is affecting customer retention."</p><p>Additionally, Hubble has its own custom flow of notifications. The company uses the ReCharge API to automate customer emails three days in advance of delivery of the initial set of contacts by triggering the Hubble email system. Moreover, Hubble has been able to monitor email campaigns and their impact on whether or not the frequency of emails hurts or helps retention.</p><p>By taking these steps and implementing ReCharge in their daily operations, Hubble was able to realize an increase in daily orders and customer acquisition to become the fastest-growing contact lens brand in the country.</p>';
	            break;
	        case 'rungum' :
				$csCompany = 'run-gum';
				$csSubType = 'Refills';
				$csLogo = 'rungum_logo.png';
				$csImage = 'rungum_product.jpg';
				$csHeadshot = 'rungum_headshot.jpg';
				$csStat1no = '+200%'; $csStat1 = 'repeat purchase rate in first 3 months after Smile.io launch';
				$csStat2no = '+24%'; $csStat2 = 'conversion rate in first 3 months after Smile.io launch';
				$csStat3no = '$37.5K'; $csStat3 = 'reward member revenue in first 3 months after Smile.io launch';
				$csSummary = 'Run Gum® has long been using ReCharge to power its subscriptions and energize people on the go. When they saw our recent integration with Smile.io — they decided to take their subscription service to the next level with this customer rewards addition. Not only did Run Gum love working with the team at Smile.io, but they had their most successful quarter after the launch.';
				$csAbout = 'In 2014, two-time Olympian and five-time U.S. 800m champion Nick Symmonds partnered with his coach Sam Lapray to create Run Gum® — a caffeine-enhanced, zero-calorie gum that gives a quick boost of energy when it’s most needed by athletes and “anyone on the run.” Born from a passion for pushing limits, Run Gum has created an inspiring culture that drives people to maximize their performance both in sport and in life.';
				$csExecutive = 'Nathan Woods'; $csExecTitle = 'RUN GUM COO';
				$csQuote1 = '“For me, it comes down to people, and both ReCharge and Smile.io have the kinds of people I enjoy working with.”';
				$csChallenge = '<p>Run Gum always has their on-the-go customers in mind, which is why they use ReCharge to power their subscriptions. With ReCharge, they’ve been able to give their customers the option to sign up for automatic refills to be delivered every 1, 2, or 3 months — saving customers 20% in the process. It’s not only skyrocketed repeat sales for Run Gum, but provided the convenience their busy customers love.</p><p>When Nathan and his team saw that ReCharge had integrated with Smile.io, which powers reward programs for 15,000 merchants across the globe — they decided to give it a try. They’d been considering a loyalty program for some time, and the integration with ReCharge was the deciding factor.</p>';
				$csQuote2 = '“I love the initiative Smile.io takes to help us succeed. Not every app company goes to that length to offer that kind of support.”';
				$csResults = '<p>With Smile.io, Run Gum has been able to create a successful rewards program that encourages its customers to interact more actively with the brand, purchase more Run Gum, and even become brand advocates. There are a multitude of ways to earn rewards — from posting on social media, to writing product reviews, to recommending the product to a friend. And it only takes a few points for active program members to start saving on their future purchases.</p><p>Just 3 months into working with Smile.io, Run Gum is already incredibly happy with the experience — they’ve seen their biggest quarter in sales to date. The new rewards program is quickly driving up repeat purchase rates, conversion rates, and repeat member value.</p>';
	            break;
	        case 'darn-good-yarn' :
				$csCompany = 'darn-good-yarn';
				$csSubType = 'Subscription Box';
				$csLogo = 'darn-good-yarn_logo.png';
				$csImage = 'darn-good-yarn_product.jpg';
				$csHeadshot = 'darn-good-yarn_headshot.jpg';
				$csStat1no = '13x'; $csStat1 = '(1300%) growth in subscribers in 1st year after switching to ReCharge';
				$csStat2no = '4000+'; $csStat2 = 'new subscribers in 1st year after switching to ReCharge';
				$csStat3no = '300'; $csStat3 = '# of new jobs created for women in Nepal and India';
				$csSummary = 'Darn Good Yarn provides beautiful yarn for knitting enthusiasts, while helping create quality jobs for women in Nepal and India. A large part of Darn Good Yarn’s sales have always come from subscriptions, but it was becoming difficult to scale while working with CrateJoy. Switching to ReCharge has allowed Darn Good Yarn to grow from 350 subscribers to more than 4,500 — and make more of an impact around the world.';
				$csAbout = 'Darn Good Yarn strives to have a positive impact on the environment and on people around the world. Founded by Nicole Snow in 2008, Darn Good Yarn hires women in India and Nepal to take offcuts and discards from large clothing factories (which would normally go into landfills) and hand-make them into beautiful knitting yarn. The women get sustainable jobs that help them become more independent — and customers around the world get monthly packages of gorgeous, ethically-made yarn shipped to their door.';
				$csExecutive = 'Nicole Snow'; $csExecTitle = 'Founder & CEO';
				$csQuote1 = '“ReCharge helps us make an even greater difference in the world by allowing us to focus on our mission instead of the logistics of subscriptions.”';
				$csChallenge = '<p>Founder & CEO of Darn Good Yarn, Nicole Snow, always knew the value of a subscription sales model. Before BirchBox was even a thing, she had created a “club” for knitting enthusiasts, keeping customers engaged with annual coupon codes and special pricing for recurring orders.</p><p>Nicole later launched her business on a competing subscription app, expecting an easy, out-of-the-box solution. She soon realized that it wasn’t so easy to create the experience she wanted for her customers — and delays in receiving support weren’t helping. On top of that, the fees seemed too high for Nicole, especially if she wanted to scale her subscriptions as her business grew. After deciding to switch to ReCharge, she immediately noticed she was receiving a much better experience and the hands-on support she needed. With an attentive team that helped migrate her customers without any service interruption, Nicole became relieved that she could finally count on having everything run smoothly along with affordable pricing for her bottom line.</p>';
				$csQuote2 = '“What I love about ReCharge compared to CrateJoy, is that I can have anything I want. The things that make my company special, I can have.”';
				$csResults = '<p>The team at ReCharge didn’t disappoint, helping Darn Good Yarn quickly transfer over all their customers, taking special care to make sure all their plan details were preserved.  Working with a developer, Darn Good Yarn was also able to create the exact look and feel they wanted for the subscriptions on their site — something that they couldn’t do with CrateJoy. Most importantly, throughout the process, Founder & CEO Nicole Snow felt like the team at ReCharge really understood and supported her mission of making a difference in the world — doing everything they could to allow her to scale more easily and make more of an impact.</p><p>Darn Good Yarn has seen fantastic results since switching over to ReCharge. Feeling confident investing in marketing efforts for subscriptions, Nicole grew the company’s subscription base from 350 to more than 4,500 customers in the first year. The best part? Exponential growth for her company has also meant exponential growth for the number of jobs she’s been able to create for women.</p>';
	            break;
	        case 'hacker-boxes' :
				$csCompany = 'hacker-boxes';
				$csSubType = 'Subscription Box';
				$csLogo = 'hacker-boxes_logo.png';
				$csImage = 'hacker-boxes_product.jpg';
				$csHeadshot = 'hacker-boxes_headshot.jpg';
				$csStat1no = '#1'; $csStat1 = 'sign-up day in company history on first day of ReCharge launch';
				$csStat2no = '3x'; $csStat2 = 'growth in revenue in 3 months since ReCharge launch';
				$csStat3no = '$105'; $csStat3 = 'average revenue per customer';
				$csSummary = 'HackerBoxes is a quickly-growing company offering a monthly subscription box of electronics projects. Originally, HackerBoxes was working with CrateJoy, but the founders quickly realized this wasn’t the right platform for them, and they switched to ReCharge. They were able to easily move over a large number of subscribers (with all their subscription complexities) over to ReCharge — and dramatically increase their subscriber rate and revenue.';
				$csAbout = 'HackerBoxes started out in late 2015 when Joseph Long and his wife decided to create a monthly subscription box of fun projects that would offer the maker community a new way to learn, find new challenges, have fun and work together. Nineteen months since their first shipment, HackerBoxes has a sizeable following of electronics hobbyists, makers, hackers and computer enthusiasts — the “dreamers of dreams” as HackerBoxes likes to call them.';
				$csExecutive = 'Joseph Long'; $csExecTitle = 'Founder and Owner, HackerBoxes';
				$csQuote1 = '“If you are starting a recurring business model, ReCharge is a no-brainer. If you are migrating like we did, ReCharge will help you make it happen.”';
				$csChallenge = '<p>Joseph Long, founder of HackerBoxes, found Cratejoy frustrating as a subscription solution because of its focus on building out its own marketplace, where it forever owns any customers that come through it. This, combined with Joseph’s dissatisfaction with CrateJoy’s customer support, made him realize he needed to find a different solution.</p><p>After doing some initial research and talking to other box company owners, he chose to move to Shopify — and use ReCharge as his subscription platform. He was excited about how much Shopify would be able to simplify and organize his back end processes, as well as how well ReCharge seamlessly integrates with Shopify’s dashboard. Knowing his business had numerous complexities such as international addresses, gift cards, non-Stripe customers and one-time store items, Joe didn’t expect this to be an easy migration, but he was pleasantly surprised.</p>';
				$csQuote2 = '“We did not expect the migration to be an easy feat, but the team at ReCharge made it relatively painless and was very patient with all of our questions.”';
				$csResults = '<p>The team at ReCharge was always just one email or phone call away — helping Joseph quickly figure out any issue he was having. Joseph was also happy to find out how flexible the ReCharge platform is in comparison to CrateJoy, allowing him to control translations, customer customization options, and much more.</p><p>The first advertising campaign HackerBoxes ran after the migration to ReCharge led to the highest subscriber date in the company’s history.</p><p>HackerBoxes plans to keep growing with ReCharge, aiming to double their subscribers by the end of the year. And having seen how easy ReCharge makes subscriptions, they are now considering launching another subscription box targeted at a larger audience.</p>';
	            break;
	        case 'foot-cardigan' :
				$csCompany = 'foot-cardigan';
				$csSubType = 'Subscription Box';
				$csLogo = 'foot-cardigan_logo.png';
				$csImage = 'foot-cardigan_product.jpg';
				$csHeadshot = 'foot-cardigan_headshot.jpg';
				$csStat1no = '8,000'; $csStat1 = 'subscribers migrated from FoxyCart to ReCharge';
				$csStat2no = '0'; $csStat2 = 'down time during transition';
				$csStat3no = '1M+'; $csStat3 = 'socks shipped in last 12 month';
				$csSummary = 'Foot Cardigan has built an incredibly successful company out of a simple idea: a monthly subscription of wacky socks. However, as the company grew, it also found itself devoting increasingly more internal time and resources to subscription platform development. After transferring their subscribers to Shopify and ReCharge, they’ve not only been able to focus on what they love and do best, but also get a number of new tools to help them grow.';
				$csAbout = 'Launched by Bryan DeLuca, Tom Browning, and Matt McClard in 2012, Foot Cardigan is a wacky sock subscription service for men, women and children around the world that makes their feet a whole lot more awesome. For just $12 a month, customers can get a pair of “fabulously bizarre socks” shipped to their door every month. These unique designs are always a fun surprise, as well as an instant conversation starter. And since 2014, Foot Cardigan has also offered an a la carte store of limited-run sock options.';
				$csExecutive = 'Matt McClard'; $csExecTitle = 'CTO, Foot Cardigan';
				$csQuote1 = '“ReCharge is a very well-thought-out platform that expertly handles all the difficulties of subscriptions — allowing us to concentrate on what we’re good at instead.”';
				$csChallenge = '<p>Every year since its inception in 2012, Foot Cardigan has been doubling or tripling in size — and sales skyrocketed to $2.5 million in 2015 after their appearance on ABC’s Shark Tank. But while sales kept growing, the back end systems weren’t keeping up.</p><p>Foot Cardigan originally started out on a shopping cart platform called FoxyCart, but since it was created specifically for developers, it required a lot of time and effort from Matt McClard — Foot Cardigan’s CTO and chief developer. This just wasn’t sustainable in the long term, so Matt looked into a variety of alternative options — and even started to develop a shopping cart from the ground up using a JavaScript back-end platform called Meteor. Ultimately, however, he was disappointed by its inability to cater to physical product companies and effectively connect to operations and fulfillment systems. </p><p>That’s when Matt and the Foot Cardigan team took a step back and re-evaluated whether it was worth spending so much time and effort on development, instead of focusing on what they loved to do. The answer was a resounding no, which is why Foot Cardigan turned to Shopify Plus and ReCharge.</p><p>Although Matt had initially looked into two different subscription platforms on Shopify, he kept hearing positive things about ReCharge — and was ultimately convinced by his conversations with Chathri Ali, Director of Growth & Marketing at ReCharge. He could tell the team at ReCharge would be enjoyable to work with, really knew what it was doing, and truly cared about the success of his company.</p>';
				$csQuote2 = '“The reporting capabilities with ReCharge are far better than what we had before, giving us much greater insight into customer activities, potential issues, and ways to grow lifetime value.”';
				$csResults = '<p>The transition of Foot Cardigan’s 8,000 active subscribers was seamless. Matt was able to preserve the company’s varying payment periods and gift subscriptions, customers never lost service, and the ReCharge team was there to help every step of the way. Now that the migration is complete, Matt and the Foot Cardigan team can breathe a sigh of relief and finally concentrate on growing the business even further.</p><p>For Foot Cardigan, being able to work with a company that only focuses on subscriptions has offered peace of mind, because they can trust ReCharge to truly take care of one of the most important parts of their business. On top of that, Foot Cardigan has seen significant improvements to what they can now do — including the ability to easily make changes to subscription details, as well as get much better insights into performance metrics.</p><p>Next, Matt and his team are excited to explore all the possible integrations ReCharge offers and how those can help extend lifetime customer value through reporting, loyalty programs, email marketing, and more.</p>';
	            break;
	        case 'humankind' :
				$csCompany = 'humankind';
				$csSubType = 'Refill';
				$csLogo = 'humankind_logo.png';
				$csImage = 'humankind_product.jpg';
				$csHeadshot = 'humankind_headshot.jpg';
				$csStat1no = '150%'; $csStat1 = 'month over month growth';
				$csStat2no = '4-6'; $csStat2 = 'months LTV';
				$csStat3no = '#1'; $csStat3 = 'fastest growing human-grade pet food company';
				$csSummary = 'When new pet food company Humankind came to New York-based digital agency Verbal+Visual for help creating their online store, a subscription option was one of their most critical requirements for the eCommerce experience. Verbal+Visual chose ReCharge to power the subscription portion of the website — and built a variety of custom capabilities on the platform. In the end, both Verbal+Visual and Humankind love the final product and are already seeing 150% month over month growth.';
				$csAbout = 'Launched in 2017, Humankind® provides 100% human quality food for pets. Their mission is to help people’s four-legged family members live their longest and healthiest lives. With three types of dog food currently available (and feline options coming soon), Humankind encourages customers to subscribe to their favorite product — and ensure their pets are always taken care of.';
				$csExecutive = 'Caroline Dau'; $csExecTitle = 'COO, Verbal+Visual';
				$csQuote1 = '“We would love to work with ReCharge again in the future. The combination of robust, out-of-the-box features with the ability to customize the code on our end, makes it perfect for our clients.”';
				$csChallenge = '<p>Verbal+Visual is a digital agency that works with emerging retailers to recreate and reimagine their eCommerce experience. Often sought out by clients for their Shopify Plus expertise, they were contracted by pet food company Humankind to build their online experience. One of the things that was a critical requirement for Humankind from the start was the ability to have an auto-ship option — as their customer and competitive research revealed that consumers in this space wanted to be able to subscribe for pet food delivery.</p><p>Verbal+Visual looked into two different subscription platforms available on Shopify, but they ultimately chose to go with ReCharge because of its extensive out-of-the-box feature set and ability to customize the code to meet special client requests.</p>';
				$csQuote2 = '“The ReCharge team was always there to answer our questions and worked with us to help us accomplish all the custom development we needed to do.”';
				$csResults = '<p>Verbal+Visual strategized internally with Humankind to create a list of requirements for the eCommerce site — and then worked with ReCharge to make everything come to life. At any point, Verbal+Visual was able to turn to the ReCharge development team for guidance and code feedback when it came to the implementation of custom elements, which included:<ul><li>The option for a user to choose the frequency of shipments from each individual product page</li><li>Asynchronous switching between one-time and recharge purchases on both the cart and checkout pages</li><li>An address verification feature that integrates with Google Maps to ensure any shipping address entered is valid</li></ul></p><p>In the end, Verbal+Visual loved working with ReCharge. They were able to implement all the custom options Humankind wanted, as well as provide their client with an easy-to-use interface they could manage on their own. Since launching with the ReCharge platform, Humankind has seen 150% month over month growth and is proud to be #1 fastest growing human-grade pet food company.</p>';
	            break;
	        case 'dr-axe' :
				$csCompany = 'dr-axe';
				$csSubType = 'Refill';
				$csLogo = 'dr-axe_logo.png';
				$csImage = 'dr-axe_product.jpg';
				$csHeadshot = 'dr-axe_headshot.jpg';
				$csStat1no = '14,500'; $csStat1 = 'customers migrated from Bold to ReCharge';
				$csStat2no = '80+'; $csStat2 = 'subscription products offered online';
				$csStat3no = '#1'; $csStat3 = 'fastest growing supplement subscription company on Shopify';
				$csSummary = 'When supplement company Axe Wellness (DrAxe.com) made the decision to migrate 14,500 subscribers and 80 subscription products from Bold to ReCharge, they knew it would be a large undertaking. Despite the size of the project and the number of custom requirements, they found it was a painless process thanks to the ReCharge support and development teams who were there for them every step of the way.';
				$csAbout = 'Dr. Josh Axe, DNM, DC, CNS, is a certified doctor of natural medicine, doctor of chiropractic, clinical nutritionist, and bestselling author with a passion to help people get healthy by using food as medicine. In 2010, he founded one of the most visited natural health websites in the world at DrAxe.com, with an online subscription store of supplements and essential oils that features best-selling products such as collagen and bone broth protein&#8482; powder.';
				$csExecutive = 'Kate Johnson'; $csExecTitle = ' Senior Director, Digital Marketing & eCommerce, Axe Wellness';
				$csQuote1 = '“ReCharge provided great support throughout the process, as well as a fantastic point of contact (Ana). I felt comfortable sending anyone on our Customer Service team directly to her with questions, without always having to be involved.”';
				$csChallenge = '<p>As a supplement company, Axe Wellness has always seen subscriptions as a critical component of their business. They encourage all website visitors to sign up for their Subscribe-and-Save program, which offers benefits such as 15% off all purchases, free shipping, VIP customer support, and early access to new products.</p><p>Axe Wellness had previously partnered with Bold for the technology to power their subscriptions, but in 2016, Senior Director of Digital Marketing & eCommerce, Kate Johnson, made the decision to move over to ReCharge out of a desire to improve their service experience. With thousands of subscribers to migrate, more than 80 subscription products, and a number of custom requirements — she knew it was going to be a big undertaking.</p>';
				$csQuote2 = '“Having access to ReCharge’s development team was incredibly helpful. Our developer could ask questions directly in a Slack channel, without having to spend additional time going through account managers.”';
				$csResults = '<p>Knowing that they had a number of custom requirements for their subscription platform — from its visual design, to a one-click upsell option — Kate Johnson hired an eCommerce development agency to manage the technical side of the process internally. Working closely with ReCharge, Axe Wellness and their development agency first shifted the front end experience on the Dr. Axe website over to the new platform — and once that was stable, migrated all 14,500 existing customers.</p><p>Throughout the migration process, Axe Wellness knew they could rely on ReCharge to help ensure everything went smoothly. That kind of service experience — which continues today — is exactly what Kate Johnson and her team had been looking for. An added bonus were the much improved reporting capabilities they discovered they were able to take advantage of once on the ReCharge platform.</p>';
	            break;
	        default :
	            $caseStudyDetail = '';
	            break;
	    }
	}
?>

<?php if (!empty($caseStudyDetail)) : ?>
	
<div class="rc_layout__container--case-studies layout__container">
	<div class="rc_layout__full ">
		<div class="rc_layout">
			<div class="rc_layout__sm__5 rc_layout__md__6 case-studies__about">
				<img src="/assets/images/case-studies/<?php echo $csCompany; ?>/<?php echo $csLogo; ?>" class="case-studies__logo--detail">
				<h4>About</h4><?php echo $csAbout; ?>
				<br><br><h4>Subscription type</h4>
				<p><?php echo $csSubType; ?></p>
			</div>
			<div class="rc_layout__sm__7 rc_layout__md__6 case-studies__stat--expanded">
				<h3>Summary</h3>
				<p><?php echo $csSummary; ?></p>
				<br>
				<div class="rc_layout case-studies__stat__circles">
					<div class="rc_layout__md__4">
						<div class="case-studies__stat--circle"><?php echo $csStat1no; ?></div>
						<div class="case-studies__stat--detail"><?php echo $csStat1; ?></div>
					</div>
					<div class="rc_layout__md__4">
						<div class="case-studies__stat--circle"><?php echo $csStat2no; ?></div>
						<div class="case-studies__stat--detail"><?php echo $csStat2; ?></div>
					</div>
					<div class="rc_layout__md__4">
						<div class="case-studies__stat--circle"><?php echo $csStat3no; ?></div>
						<div class="case-studies__stat--detail"><?php echo $csStat3; ?></div>
					</div>
					<br>
				</div>
			</div>
		</div>
		<div class="rc_layout case-studies__quote--detail">
			<div class="rc_layout__sm__9">
				<p><?php echo $csQuote1; ?></p>
				<br>
				<div class="case-studies__quote__ref">
					<h5 class="case-studies__quote__ref__name"><?php echo $csExecutive; ?></h5>
					<span class="case-studies__quote__ref__role"><?php echo $csExecTitle; ?></span>
				</div>
				<?php /* 
					<span><b><?php echo $csExecutive; ?></b><label><?php echo $csExecTitle; ?></label></span>
				*/ ?>
			</div>
			<div class="rc_layout__sm__3 case-studies__quote__img">
		  		<img src="/assets/images/case-studies/<?php echo $csCompany; ?>/<?php echo $csHeadshot; ?>">
			</div>
		</div>
		<div class="rc_layout case-studies__challenge">
			<div class="rc_layout__md__5 case-studies__challenge__image">
				<img src="/assets/images/case-studies/<?php echo $csCompany; ?>/<?php echo $csImage; ?>">
			</div>
			<div class="rc_layout__md__7 case-studies__challenge__description">
				<h3>Challenge</h3>
				<p><?php echo $csChallenge; ?></p>
			</div>
		</div>
		<div class="rc_layout case-studies__quote--no-img">
			<div class="rc_layout case-studies__container">
				<div class="rc_layout__sm__9">
					<p><?php echo $csQuote2; ?></p>
				</div>
				<div class="rc_layout__sm__3">
					<div class="case-studies__quote__ref">
					<h5 class="case-studies__quote__ref__name"><?php echo $csExecutive; ?></h5>
					<span class="case-studies__quote__ref__role"><?php echo $csExecTitle; ?></span>
					</div>
				</div>
			</div>
		</div>
		<div class="rc_layout  case-studies__results">
			<div class="rc_layout__sm__12">
		  		<h3>Results</h3>
		  		<p><?php echo $csResults; ?></p>
			</div>
		</div>
		<div class="rc_layout case-studies__cases-heading">
			<div class="rc_layout__sm__12">
				<h1 class="cases-heading">More Happy Clients</h1>
			</div>
		</div>
	</div>
</div>

<?php endif; ?>

<?php

	//Complete list of each type
	$array_subscriptionbox = array('darn-good-yarn','pusheen-box','short-par-4','hacker-boxes', 'foot-cardigan');
	$array_refill = array('clearly-filtered','hubble','rungum','humankind', 'dr-axe');

	//QTY of case that we want to show for each type
	$numofbox = 2;
	$numofrefill = 2;

	//Search and remove the selected case study to avoid it at the bottom
	if(!empty($caseStudyDetail)){
		if(in_array($caseStudyDetail, $array_subscriptionbox)){
			$array_subscriptionbox = array_diff($array_subscriptionbox, [$caseStudyDetail]);			
		}elseif(in_array($caseStudyDetail, $array_refill)){
			$array_refill = array_diff($array_refill, [$caseStudyDetail]);
		}
	}

	//Choose the QTY selected for each type choose randomly.
	$subscriptionbox_random = array_rand($array_subscriptionbox, $numofbox);
	$refill_random = array_rand($array_refill, $numofrefill);

	$case_show = array();

	//Fill new array only with the values to show
	foreach ($subscriptionbox_random as $key => $value) {
		array_push($case_show, $array_subscriptionbox[$value]);
	}

	foreach ($refill_random as $key => $value) {
		array_push($case_show, $array_refill[$value]);
	}
?>

<div class="case-studies__container--boxes layout__container">
	<div class="rc_layout__full">
		<div class="rc_layout">
			<div class="rc_layout__sm__6 case-studies__block case-studies__block--dr-axe <?php if(!empty($caseStudyDetail) and !in_array('dr-axe', $case_show)) : echo case_studies_hidden; endif; ?> ">
				<a data-toggle="rc_modal__window" href="?dr-axe"><img src="/assets/images/case-studies/dr-axe/dr-axe_cover-logo.svg"></a>
			</div>			
			<div class="rc_layout__sm__6 case-studies__block case-studies__block--humankind <?php if(!empty($caseStudyDetail) and !in_array('humankind', $case_show)) : echo case_studies_hidden; endif; ?> ">
				<a data-toggle="rc_modal__window" href="?humankind"><img src="/assets/images/case-studies/humankind/humankind_cover-logo.svg"></a>
			</div>
			<div class="rc_layout__sm__6 case-studies__block case-studies__block--foot-cardigan <?php if(!empty($caseStudyDetail) and !in_array('foot-cardigan', $case_show)) : echo case_studies_hidden; endif; ?> ">
				<a data-toggle="rc_modal__window" href="?foot-cardigan"><img src="/assets/images/case-studies/foot-cardigan/foot-cardigan_cover-logo.svg"></a>
			</div>
			<div class="rc_layout__sm__6 case-studies__block case-studies__block--darn-good-yarn <?php if(!empty($caseStudyDetail) and !in_array('darn-good-yarn', $case_show)) : echo case_studies_hidden; endif; ?> ">
				<a data-toggle="rc_modal__window" href="?darn-good-yarn"><img src="/assets/images/case-studies/darn-good-yarn/darn-good-yarn_cover-logo.svg"></a>
			</div>
			<div class="rc_layout__sm__6 case-studies__block case-studies__block--pusheen-box <?php if(!empty($caseStudyDetail) and !in_array('pusheen-box', $case_show)) : echo case_studies_hidden; endif; ?> ">
				<a data-toggle="rc_modal__window" href="?pusheen-box"><img src="/assets/images/case-studies/pusheen-box/pusheen-box_cover-logo.svg"></a>
			</div>
			<div class="rc_layout__sm__6 case-studies__block case-studies__block--clearly-filtered <?php if(!empty($caseStudyDetail) and !in_array('clearly-filtered', $case_show)) : echo case_studies_hidden; endif; ?> ">
				<a data-toggle="rc_modal__window" href="?clearly-filtered"><div>Clearly Filtered</div></a>
			</div>
			<div class="rc_layout__sm__6 case-studies__block case-studies__block--short-par-4 <?php if(!empty($caseStudyDetail) and !in_array('short-par-4', $case_show)) : echo case_studies_hidden; endif; ?> ">
				<a data-toggle="rc_modal__window" href="?short-par-4"><div>ShortPar4</div></a>
			</div>
			<div class="rc_layout__sm__6 case-studies__block case-studies__block--hubble <?php if(!empty($caseStudyDetail) and !in_array('hubble', $case_show)) : echo case_studies_hidden; endif; ?> ">
				<a data-toggle="rc_modal__window" href="?hubble"><img src="/assets/images/case-studies/hubble/hubble_cover-logo.svg"></a>
			</div>
			<div class="rc_layout__sm__6 case-studies__block case-studies__block--rungum <?php if(!empty($caseStudyDetail) and !in_array('rungum', $case_show)) : echo case_studies_hidden; endif; ?> ">
				<a data-toggle="rc_modal__window" href="?rungum"><img src="/assets/images/case-studies/rungum/rungum_cover-logo.svg"></a>
			</div>
			<div class="rc_layout__sm__6 case-studies__block case-studies__block--hacker-boxes <?php if(!empty($caseStudyDetail) and !in_array('hacker-boxes', $case_show)) : echo case_studies_hidden; endif; ?> ">
				<a data-toggle="rc_modal__window" href="?hacker-boxes"><img src="/assets/images/case-studies/hacker-boxes/hacker-boxes_cover-logo.svg"></a>
			</div>
			<div class="rc_layout__sm__6 case-studies__block case-studies__block--from-the-farmer <?php if(!empty($caseStudyDetail) and !in_array('from-the-farmer', $case_show)) : echo case_studies_hidden; endif; ?> " style="display:none;">
				<a data-toggle="rc_modal__window" href="?from-the-farmer"><img src="/assets/images/case-studies/from-the-farmer/from-the-farmer_cover-logo.svg"></a>
			</div>
			<div class="rc_layout__sm__6 case-studies__block case-studies__block--placeholder <?php if(!empty($caseStudyDetail)) : echo case_studies_hidden; endif; ?>" style="display:none;">
				<a><div><span>Check back for more</span><span>Case Studies</span></div></a>
			</div>
		</div>
	</div>
</div>

<?php include('templates/static/footer.php'); ?>