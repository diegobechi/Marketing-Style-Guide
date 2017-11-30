<?php
	$page_title = 'Refersion | Integrations';
	$page_description = 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas.';
	$page_keywords = 'ReferralCandy, Zapiet, Google Analytics, Cart Hook, Integrations, Shopify, Apps, Add-ons, Refferal';
	$page_class = 'integration__details';
	$page_active = 'integration__refersion';
?>
<?php include('../templates/static/header.php'); ?>

<div class="page__container">

	<div class="rc_layout__container">
		<div class="rc_layout">
			<div class="rc_layout__sm__4">
				<img src="/assets/images/integrations/refersion_logo.png" alt="Refersion logo" class="integration__details__logo">
			</div><!-- .grid__sm__4 -->
			<div class="rc_layout__sm__8">
				<div class="integration__details">
					<div class="integration__header">
						<h1 class="integration__title">Refersion</h1>
					</div><!-- .integration__header -->
					<div class="integration__info">
						<p><a href="https://apps.shopify.com/refersion" target="_blank" class="integration__website">apps.shopify.com/refersion</a></p>
						<p>Refersion is designed to help quickly launch your affiliate program. Easily track sales commission to bloggers, influencers and ambassadors.</p>
					</div><!-- .integration__info -->
					<h5>Supported features</h5>
					<ul class="integration__features rc_list_items">
						<li class="rc_tick_ok">Find out who drove which sale, their total commission, and more. Track activity in real-time and find out who your top performers are.</li>
						<li class="rc_tick_ok">Add, modify, and approve affiliates with just a few clicks. Set commissions and manage payments with ease.</li>
						<li class="rc_tick_ok">Turn your customers into affiliates with our Post-Purchase channel and have them refer their friends!</li>
					</ul><!-- .integration__features -->
				</div><!-- .integration__details -->
			</div><!-- .grid__sm__8 -->
		</div><!-- .layout -->
	</div><!-- .container -->

</div><!-- .page__container -->

<div class="integration__explore">
	<div class="rc_layout__container">
		<h4>Explore other integrations</h4>
		<div class="rc_layout">
			<div class="rc_layout__full">
				<?php include('_listing.php'); ?>
			</div><!-- .layout__full -->
		</div><!-- .layout -->
	</div><!-- .container -->
</div><!-- .integration__explore -->

<?php include('../includes/footer.php'); ?>