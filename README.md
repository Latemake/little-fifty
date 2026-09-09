# Little Fifty — Vapaa tie

Desktop browser moped wheelie game with a Finnish main menu, settings and a bike shop.

## Run

`npm install`, then `npm run dev`. Open the printed local address and choose **LÄHDE AJAMAAN**. `npm run build` creates a static build in `dist`. Run `npm test` for the physics and frame-timing checks.

## Controls

W: throttle · S: rear brake · A/D: steer · ↓: lean back · ↑: lean forward · R: reset · Esc: menu / resume. Space and Shift still work as lean aliases.

Hold W + ↓ to lift. W alone can lift the front under hard acceleration, but backward lean makes it much easier. Holding ↑ prevents lifting from the ground, even when ↓ is also held. The rider shifts weight while keeping hands on the bars.

The effective center of mass determines the balance point: approximately 60° neutral, 52° leaning back, and 65° forward. Gravity lowers the front below that angle and tips the bike backwards above it. Feather W and use ↑ or S to recover. There is no angle lock or wheelie time limit.

## Menu and settings

The menu pauses your ride; resuming preserves position and speed. Switching away from the browser also pauses the game. Settings persist locally: high/light graphics, field of view, camera distance, steering sensitivity and keyboard hints. Fullscreen is available in settings. The shop offers Rieju MRT 50cc, Sur-Ron Light Bee X and Sur-Ron Ultra Bee. All three are freely selectable in the prototype; there is no currency or transaction system.

## Implementation

Custom arcade physics run at a fixed 120 Hz, with real elapsed-time catch-up through frames as slow as 4 FPS. Exceptionally long stalls are capped at 250 ms to avoid an unbounded catch-up loop. Acceleration and pitch response are snappier, and the closer chase camera widens its field of view with speed.

Eleven terrain chunks are recycled with stable slots. Trees, rocks and roadside markers use instancing and shared geometry. Graphics include procedural asphalt, a gradient sky, distant mountains, warm lighting, high-quality-mode shadows, and additional bike details. No external model or image assets are needed. Fonts load from Google Fonts with local fallbacks. A keyboard and WebGL 2 browser are required; graphics quality can be lowered in settings.

Rendering uses Three.js [WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html).

## Bike profiles and reference data

The shop now lets you preview and equip three distinct bikes for free. Selection is saved locally. Equipping a different bike starts a fresh ride; simply previewing one does not change your equipped bike.

| Bike represented | Game top speed | Reference wheel torque | Visual identity |
| --- | --- | --- | --- |
| Rieju MRT 50cc / MRT 50 SM, stock | 45 km/h | Not published in the cited specification | Red/white plastics, steel frame, two-stroke expansion chamber and silencer |
| Sur-Ron Light Bee X, MY26 off-road | 80 km/h | 295 Nm | Compact dark frame, green rails, narrow battery and short seat |
| Sur-Ron Ultra Bee HP X, MY26 off-road | 95 km/h | 520 Nm | Larger silver frame, broad battery, white/yellow shrouds and larger chassis |

The Sur-Ron references are the **2026 versions**, not earlier 6 kW Light Bees or 12.5 kW Ultra Bees. Manufacturer top speeds of 50 and 59 mph are rounded to 80 and 95 km/h. Light Bee maximum power is 10 kW; Ultra Bee's 24.5 kW represents the advertised peak Turbo performance. The game uses a single simplified power profile, not the manufacturer's full modes or electronic wheelie aids.

Sources: [Sur-Ron UK Light Bee X MY26](https://sur-ron.co.uk/light-bee-x-na/), [Sur-Ron UK Ultra Bee HP X MY26](https://sur-ron.co.uk/ultra-bee-hp-x-24-5kw-my26/), [Rieju Finnish 2025 brochure](https://cdn.rieju.com/uploads/_news/-1/gallery5/rieju_esite_2025-68500b880b4be.pdf), [Rieju MRT 50 chassis and engine specifications](https://rieju.com/en/off-road/4/243/mrt-50).

Acceleration is calculated from wheel torque, wheel radius, available power and bike + 75 kg rider mass, with a soft speed limiter. Torque per total mass also affects pitch torque. Rieju's **110 Nm at the rear wheel and 2.5 kW are gameplay tuning estimates**, not manufacturer claims; the wheel torque represents low gearing, not crankshaft torque. Pitch gain, effective center of mass, throttle response and damping remain arcade tuning so balancing remains playable. The front-lean lift prevention from the earlier version is preserved. Peak performance figures do not imply a certified real-world vehicle simulation.

The new rider uses rounded, articulated limbs, shoulder and knee protection, goggles, boots and gloves. Animation follows actual inputs and simulation state: right-hand throttle twist, rear-brake lever/fingers on electric bikes, right-foot braking on Rieju, steering-linked hands and forks, body weight shift, load response and suspension movement. Bike resources are disposed when changing the preview.


## Scrapes, loop-outs and rendering smoothness

The rear fenders are now smaller, thin plastic parts. Ground contact bends the plastic strip without applying pitch torque, angular damping or a speed clamp to the bike. It cannot support an unattended wheelie. Gentle contact can be recovered with the rear brake; excessive bending snaps the fender off. The detached piece tumbles away and disappears after two seconds; the fender remains broken until R/reset. Metal skids and glowing sparks have been removed in favour of subtle plastic flecks.

During a loop-out the rider releases the bars, spreads arms and legs and falls behind the bike. The bike tips sideways; both settle above the ground. The reset prompt appears after the fall animation, and R can restart immediately. Reset clears the crash pose and plastic flecks, and restores the fender.

Physics still run at 120 Hz; rendering now interpolates the previous/current states. The camera follows the same interpolated translation, rather than independently lagging behind discrete physics poses. Static model parts are merged by material while articulated parts stay independent. A browser measurement reduced draw calls from 346 to 238 in the tested Rieju riding view; FPS improvement depends on hardware. UI updates are limited to 10 Hz, shadow movement is aligned to shadow-map texels, asphalt uses anisotropic filtering, and recycled terrain boundaries are hidden by fog. Plastic flecks reuse the fixed particle pool. The bending fender and its detached fragment reuse the same geometry, without spawning new meshes during gameplay.

## Visual bike shop

The shop opens with image cards instead of immediately showing specifications. Clicking a card (or activating it with Enter/Space) opens that bike's specifications and 3D preview. The back button returns to the card collection; previewing a bike does not equip it. Equipping and saved selection continue to work as before. The layout supports narrow screens.

Shop images are local files in `public/bikes/`: `rieju.png` is rendered from this project's own model. `light.png` and `ultra.png` are product images from Sur-Ron UK's model pages: [Light Bee X](https://sur-ron.co.uk/light-bee-x-na/) ([image](https://sur-ron.co.uk/wp-content/uploads/2026/06/lbn-white-1-e1785742673259.png)) and [Ultra Bee HP X](https://sur-ron.co.uk/ultra-bee-hp-x-24-5kw-my26/) ([image](https://sur-ron.co.uk/wp-content/uploads/2026/01/UBG.png)). Product photos illustrate the real bikes; the game's 3D models remain stylized.


## Camera toggle

Press **C** while riding to toggle first-person / third-person. First-person follows the rider's animated eye position and hides the helmet so it does not block the view; hands and handlebars remain visible. The view keeps a stable horizon during wheelies. Menus retain their normal preview camera, and crashes temporarily use third-person to show the fall. Reset and resume restore your chosen riding view.

## Revised wheelie gravity

Pitch now integrates torque in Nm divided by estimated bike/rider inertia in kg m². Gravity uses 9.81 m/s² and the center-of-mass lever arm; angular damping is reduced from 2.6 to 0.35 per second. Closed throttle decays quickly, and the drive moment falls with available motor power and the speed limiter. Rear braking uses a braking moment; the existing spring absorbs front-wheel landings.

Controlled Rieju drops from rest in pitch, at 8 m/s and neutral lean: 30° takes about 0.51 s, 45° about 0.80 s, and 55° about 1.23 s (previously 0.78 / 1.32 / 2.17 s). Falling remains slower near the balance point because gravity's lever arm approaches zero there. Above the point, gravity tips the bike backwards. These are regression measurements of the game, not measured real-bike drop times. Effective center of mass, distributed inertia and the 50cc lift assist remain gameplay estimates.


## KuKirin G2

Standing scooter with a grey/orange chassis and its own balance point. The requested game top speed is 53 km/h; the supplied product screenshot lists 45 km/h and 800 W. Mass, wheel torque and lift assistance are arcade estimates. The shop thumbnail is rendered from the game model.
