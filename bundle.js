(function (p5) { 'use strict';

  p5 = 'default' in p5 ? p5['default'] : p5;

  var babelHelpers_classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var babelHelpers_createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var babelHelpers_inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var babelHelpers_possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var Vector3D = function () {
    function Vector3D() {
      var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
      var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
      var z = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
      babelHelpers_classCallCheck(this, Vector3D);

      this.x = x;
      this.y = y;
      this.z = z;
    }

    babelHelpers_createClass(Vector3D, [{
      key: 'setX',
      value: function setX(x) {
        this.x = x;
      }
    }, {
      key: 'setY',
      value: function setY(y) {
        this.y = y;
      }
    }, {
      key: 'setZ',
      value: function setZ(z) {
        this.z = z;
      }
    }, {
      key: 'set',
      value: function set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
      }
    }, {
      key: 'setV',
      value: function setV(v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
      }
    }, {
      key: 'add',
      value: function add(x, y, z) {
        this.x += x;
        this.y += y;
        this.z += z;
      }
    }, {
      key: 'addV',
      value: function addV(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
      }
    }, {
      key: 'subtract',
      value: function subtract(x, y, z) {
        this.x -= x;
        this.y -= y;
        this.z -= z;
      }
    }, {
      key: 'subtractV',
      value: function subtractV(v) {
        this.x = -v.x;
        this.y = -v.y;
        this.z = -v.z;
      }
    }, {
      key: 'multiplyBy',
      value: function multiplyBy(f) {
        this.x *= f;
        this.y *= f;
        this.z *= f;
        return this;
      }
    }, {
      key: 'distanceTo',
      value: function distanceTo(x, y, z) {
        var dx = this.x - x;
        var dy = this.y - y;
        var dz = this.z - z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
      }
    }, {
      key: 'distanceToV',
      value: function distanceToV(v) {
        return Math.sqrt(this.distanceSquaredTo(v));
      }
    }, {
      key: 'distanceSquaredTo',
      value: function distanceSquaredTo(p) {
        var dx = this.x - p.x;
        var dy = this.y - p.y;
        var dz = this.z - p.z;
        return dx * dx + dy * dy + dz * dz;
      }
    }, {
      key: 'dot',
      value: function dot(p) {
        return this.x * p.x + this.y * p.y + this.z * p.z;
      }
    }, {
      key: 'length',
      value: function length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
      }
    }, {
      key: 'lengthSquared',
      value: function lengthSquared() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
      }
    }, {
      key: 'normalize',
      value: function normalize() {
        var l = this.length();
        return l === 0 ? this : this.multiplyBy(1 / l);
      }
    }, {
      key: 'unit',
      value: function unit() {
        return this.copy().normalize();
      }
    }, {
      key: 'clear',
      value: function clear() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
      }
    }, {
      key: 'copy',
      value: function copy() {
        return new Vector3D(this.x, this.y, this.z);
      }
    }, {
      key: 'toString',
      value: function toString() {
        return '(' + this.x + ', ' + this.y + ', ' + this.z + ')';
      }
    }, {
      key: 'cross',
      value: function cross(p) {
        return new Vector3D(this.y * p.z - this.z * p.y, this.x * p.z - this.z * p.x, this.x * p.y - this.y * p.x);
      }
    }, {
      key: 'isZero',
      value: function isZero() {
        return this.x === 0 && this.y === 0 && this.z === 0;
      }
    }]);
    return Vector3D;
  }();

  var Particle = function () {
    function Particle(m) {
      babelHelpers_classCallCheck(this, Particle);

      this.position = new Vector3D();
      this.velocity = new Vector3D();
      this.force = new Vector3D();
      this.mass = m;
      this.invMass = 1 / m;
      this.fixed = false;
      this.age = 0;
      this.dead = false;
    }

    babelHelpers_createClass(Particle, [{
      key: 'distanceTo',
      value: function distanceTo(p) {
        return this.position.distanceToV(p.position);
      }
    }, {
      key: 'makeFixed',
      value: function makeFixed() {
        this.fixed = true;
        this.velocity.clear();
      }
    }, {
      key: 'isFixed',
      value: function isFixed() {
        return this.fixed;
      }
    }, {
      key: 'isFree',
      value: function isFree() {
        return !this.fixed;
      }
    }, {
      key: 'makeFree',
      value: function makeFree() {
        this.fixed = false;
      }
    }, {
      key: 'setMass',
      value: function setMass(m) {
        this.mass = m;
        this.invMass = 1 / m;
      }
    }, {
      key: '_reset',
      value: function _reset() {
        this.age = 0;
        this.dead = false;
        this.position.clear();
        this.velocity.clear();
        this.force.clear();
        this.mass = 1;
        this.invMass = 1;
      }
    }]);
    return Particle;
  }();

  // attract positive repel negative

  var Attraction /* implements Force */ = function () {
    function Attraction(a, b, k, distanceMin) {
      babelHelpers_classCallCheck(this, Attraction);

      this.a = a;
      this.b = b;
      this.k = k;
      this.on = true;
      this.distanceMin = distanceMin;
      this.distanceMinSquared = distanceMin * distanceMin;
    }

    babelHelpers_createClass(Attraction, [{
      key: '_setA',
      value: function _setA(p) {
        this.a = p;
      }
    }, {
      key: '_setB',
      value: function _setB(p) {
        this.b = p;
      }
    }, {
      key: 'getMinimumDistance',
      value: function getMinimumDistance() {
        return this.distanceMin;
      }
    }, {
      key: 'setMinimumDistance',
      value: function setMinimumDistance(d) {
        this.distanceMin = d;
        this.distanceMinSquared = d * d;
      }
    }, {
      key: 'turnOff',
      value: function turnOff() {
        this.on = false;
      }
    }, {
      key: 'turnOn',
      value: function turnOn() {
        this.on = true;
      }
    }, {
      key: 'setStrength',
      value: function setStrength(k) {
        this.k = k;
      }
    }, {
      key: 'getOneEnd',
      value: function getOneEnd() {
        return this.a;
      }
    }, {
      key: 'getTheOtherEnd',
      value: function getTheOtherEnd() {
        return this.b;
      }
    }, {
      key: 'getStrength',
      value: function getStrength() {
        return this.k;
      }
    }, {
      key: 'isOn',
      value: function isOn() {
        return this.on;
      }
    }, {
      key: 'isOff',
      value: function isOff() {
        return !this.on;
      }
    }, {
      key: 'apply',
      value: function apply() {
        if (this.on && (this.a.isFree() || this.b.isFree())) {
          var a2bX = this.a.position.x - this.b.position.x;
          var a2bY = this.a.position.y - this.b.position.y;
          var a2bZ = this.a.position.z - this.b.position.z;

          var a2bDistanceSquared = a2bX * a2bX + a2bY * a2bY + a2bZ * a2bZ;

          if (a2bDistanceSquared < this.distanceMinSquared) {
            a2bDistanceSquared = this.distanceMinSquared;
          }

          var force = this.k * this.a.mass * this.b.mass / a2bDistanceSquared;

          var length = Math.sqrt(a2bDistanceSquared);

          // make unit vector

          a2bX /= length;
          a2bY /= length;
          a2bZ /= length;

          // multiply by force

          a2bX *= force;
          a2bY *= force;
          a2bZ *= force;

          // apply

          if (this.a.isFree()) {
            this.a.force.add(-a2bX, -a2bY, -a2bZ);
          }

          if (this.b.isFree()) {
            this.b.force.add(a2bX, a2bY, a2bZ);
          }
        }
      }
    }]);
    return Attraction;
  }();

  var Spring /* implements Force */ = function () {
    function Spring(a, b, ks, d, r) {
      babelHelpers_classCallCheck(this, Spring);

      this.springConstant = ks;
      this.damping = d;
      this.restLength = r;
      this.a = a;
      this.b = b;
      this.on = true;
    }

    babelHelpers_createClass(Spring, [{
      key: 'turnOff',
      value: function turnOff() {
        this.on = false;
      }
    }, {
      key: 'turnOn',
      value: function turnOn() {
        this.on = true;
      }
    }, {
      key: 'isOn',
      value: function isOn() {
        return this.on;
      }
    }, {
      key: 'isOff',
      value: function isOff() {
        return !this.on;
      }
    }, {
      key: 'getOneEnd',
      value: function getOneEnd() {
        return this.a;
      }
    }, {
      key: 'getTheOtherEnd',
      value: function getTheOtherEnd() {
        return this.b;
      }
    }, {
      key: 'currentLength',
      value: function currentLength() {
        return this.a.position.distanceToV(this.b.position);
      }
    }, {
      key: 'restLength',
      value: function restLength() {
        return this.restLength;
      }
    }, {
      key: 'strength',
      value: function strength() {
        return this.springConstant;
      }
    }, {
      key: 'setStrength',
      value: function setStrength(ks) {
        this.springConstant = ks;
      }
    }, {
      key: 'damping',
      value: function damping() {
        return this.damping;
      }
    }, {
      key: 'setDamping',
      value: function setDamping(d) {
        this.damping = d;
      }
    }, {
      key: 'setRestLength',
      value: function setRestLength(l) {
        this.restLength = l;
      }
    }, {
      key: 'apply',
      value: function apply() {
        if (this.on && (this.a.isFree() || this.b.isFree())) {
          var a2bX = this.a.position.x - this.b.position.x;
          var a2bY = this.a.position.y - this.b.position.y;
          var a2bZ = this.a.position.z - this.b.position.z;

          var a2bDistance = Math.sqrt(a2bX * a2bX + a2bY * a2bY + a2bZ * a2bZ);

          if (a2bDistance == 0) {
            a2bX = 0;
            a2bY = 0;
            a2bZ = 0;
          } else {
            a2bX /= a2bDistance;
            a2bY /= a2bDistance;
            a2bZ /= a2bDistance;
          }

          // spring force is proportional to how much it stretched

          var springForce = -(a2bDistance - this.restLength) * this.springConstant;

          // want velocity along line b/w a & b, damping force is proportional to this

          var Va2bX = this.a.velocity.x - this.b.velocity.x;
          var Va2bY = this.a.velocity.y - this.b.velocity.y;
          var Va2bZ = this.a.velocity.z - this.b.velocity.z;

          var dampingForce = -this.damping * (a2bX * Va2bX + a2bY * Va2bY + a2bZ * Va2bZ);

          // forceB is same as forceA in opposite direction

          var r = springForce + dampingForce;

          a2bX *= r;
          a2bY *= r;
          a2bZ *= r;

          if (this.a.isFree()) {
            this.a.force.add(a2bX, a2bY, a2bZ);
          }

          if (this.b.isFree()) {
            this.b.force.add(-a2bX, -a2bY, -a2bZ);
          }
        }
      }
    }, {
      key: '_setA',
      value: function _setA(p) {
        this.a = p;
      }
    }, {
      key: '_setB',
      value: function _setB(p) {
        this.b = p;
      }
    }]);
    return Spring;
  }();

  var ModifiedEulerIntegrator /* implements Integrator */ = function () {
    function ModifiedEulerIntegrator(s) {
      babelHelpers_classCallCheck(this, ModifiedEulerIntegrator);

      this.s = s;
    }

    babelHelpers_createClass(ModifiedEulerIntegrator, [{
      key: 'step',
      value: function step(t) {
        this.s._clearForces();
        this.s._applyForces();

        var halftt = 0.5 * t * t;

        for (var i = 0; i < this.s.numberOfParticles(); i++) {
          var p = this.s.getParticle(i);
          if (p.isFree()) {
            var ax = p.force.x / p.mass;
            var ay = p.force.y / p.mass;
            var az = p.force.z / p.mass;

            p.position.add(p.velocity.x / t, p.velocity.y / t, p.velocity.z / t);
            p.position.add(ax * halftt, ay * halftt, az * halftt);
            p.velocity.add(ax / t, ay / t, az / t);
          }
        }
      }
    }]);
    return ModifiedEulerIntegrator;
  }();

  var RungeKuttaIntegrator /* implements Integrator */ = function () {
    function RungeKuttaIntegrator(s) {
      babelHelpers_classCallCheck(this, RungeKuttaIntegrator);

      this.s = s;

      this.originalPositions = [];
      this.originalVelocities = [];
      this.k1Forces = [];
      this.k1Velocities = [];
      this.k2Forces = [];
      this.k2Velocities = [];
      this.k3Forces = [];
      this.k3Velocities = [];
      this.k4Forces = [];
      this.k4Velocities = [];
    }

    babelHelpers_createClass(RungeKuttaIntegrator, [{
      key: 'allocateParticles',
      value: function allocateParticles() {
        while (this.s.particles.length > this.originalPositions.length) {
          this.originalPositions.push(new Vector3D());
          this.originalVelocities.push(new Vector3D());
          this.k1Forces.push(new Vector3D());
          this.k1Velocities.push(new Vector3D());
          this.k2Forces.push(new Vector3D());
          this.k2Velocities.push(new Vector3D());
          this.k3Forces.push(new Vector3D());
          this.k3Velocities.push(new Vector3D());
          this.k4Forces.push(new Vector3D());
          this.k4Velocities.push(new Vector3D());
        }
      }
    }, {
      key: 'step',
      value: function step(deltaT) {
        this.allocateParticles();
        /////////////////////////////////////////////////////////
        // save original position and velocities

        for (var i = 0; i < this.s.particles.length; ++i) {
          var p = this.s.particles[i];
          if (p.isFree()) {
            this.originalPositions[i].setV(p.position);
            this.originalVelocities[i].setV(p.velocity);
          }

          p.force.clear(); // and clear the forces
        }

        ////////////////////////////////////////////////////////
        // get all the k1 values

        this.s._applyForces();

        // save the intermediate forces
        for (var i = 0; i < this.s.particles.length; ++i) {
          var p = this.s.particles[i];
          if (p.isFree()) {
            this.k1Forces[i].setV(p.force);
            this.k1Velocities[i].setV(p.velocity);
          }

          p.force.clear();
        }

        ////////////////////////////////////////////////////////////////
        // get k2 values

        for (var i = 0; i < this.s.particles.length; ++i) {
          var p = this.s.particles[i];
          if (p.isFree()) {
            var originalPosition = this.originalPositions[i];
            var k1Velocity = this.k1Velocities[i];

            p.position.x = originalPosition.x + k1Velocity.x * 0.5 * deltaT;
            p.position.y = originalPosition.y + k1Velocity.y * 0.5 * deltaT;
            p.position.z = originalPosition.z + k1Velocity.z * 0.5 * deltaT;

            var originalVelocity = this.originalVelocities[i];
            var k1Force = this.k1Forces[i];

            p.velocity.x = originalVelocity.x + k1Force.x * 0.5 * deltaT * p.invMass;
            p.velocity.y = originalVelocity.y + k1Force.y * 0.5 * deltaT * p.invMass;
            p.velocity.z = originalVelocity.z + k1Force.z * 0.5 * deltaT * p.invMass;
          }
        }

        this.s._applyForces();

        // save the intermediate forces
        for (var i = 0; i < this.s.particles.length; ++i) {
          var p = this.s.particles[i];
          if (p.isFree()) {
            this.k2Forces[i].setV(p.force);
            this.k2Velocities[i].setV(p.velocity);
          }

          p.force.clear(); // and clear the forces now that we are done with them
        }

        /////////////////////////////////////////////////////
        // get k3 values

        for (var i = 0; i < this.s.particles.length; ++i) {
          var p = this.s.particles[i];
          if (p.isFree()) {
            var originalPosition = this.originalPositions[i];
            var k2Velocity = this.k2Velocities[i];

            p.position.x = originalPosition.x + k2Velocity.x * 0.5 * deltaT;
            p.position.y = originalPosition.y + k2Velocity.y * 0.5 * deltaT;
            p.position.z = originalPosition.z + k2Velocity.z * 0.5 * deltaT;

            var originalVelocity = this.originalVelocities[i];
            var k2Force = this.k2Forces[i];

            p.velocity.x = originalVelocity.x + k2Force.x * 0.5 * deltaT * p.invMass;
            p.velocity.y = originalVelocity.y + k2Force.y * 0.5 * deltaT * p.invMass;
            p.velocity.z = originalVelocity.z + k2Force.z * 0.5 * deltaT * p.invMass;
          }
        }

        this.s._applyForces();

        // save the intermediate forces
        for (var i = 0; i < this.s.particles.length; ++i) {
          var p = this.s.particles[i];
          if (p.isFree()) {
            this.k3Forces[i].setV(p.force);
            this.k3Velocities[i].setV(p.velocity);
          }

          p.force.clear(); // and clear the forces now that we are done with them
        }

        //////////////////////////////////////////////////
        // get k4 values

        for (var i = 0; i < this.s.particles.length; ++i) {
          var p = this.s.particles[i];
          if (p.isFree()) {
            var originalPosition = this.originalPositions[i];
            var k3Velocity = this.k3Velocities[i];

            p.position.x = originalPosition.x + k3Velocity.x * deltaT;
            p.position.y = originalPosition.y + k3Velocity.y * deltaT;
            p.position.z = originalPosition.z + k3Velocity.z * deltaT;

            var originalVelocity = this.originalVelocities[i];
            var k3Force = this.k3Forces[i];

            p.velocity.x = originalVelocity.x + k3Force.x * deltaT * p.invMass;
            p.velocity.y = originalVelocity.y + k3Force.y * deltaT * p.invMass;
            p.velocity.z = originalVelocity.z + k3Force.z * deltaT * p.invMass;
          }
        }

        this.s._applyForces();

        // save the intermediate forces
        for (var i = 0; i < this.s.particles.length; ++i) {
          var p = this.s.particles[i];
          if (p.isFree()) {
            this.k4Forces[i].setV(p.force);
            this.k4Velocities[i].setV(p.velocity);
          }
        }

        /////////////////////////////////////////////////////////////
        // put them all together and what do you get?

        for (var i = 0; i < this.s.particles.length; ++i) {
          var p = this.s.particles[i];
          p.age += deltaT;
          if (p.isFree()) {
            // update position

            var originalPosition = this.originalPositions[i];
            var k1Velocity = this.k1Velocities[i];
            var k2Velocity = this.k2Velocities[i];
            var k3Velocity = this.k3Velocities[i];
            var k4Velocity = this.k4Velocities[i];

            p.position.x = originalPosition.x + deltaT / 6.0 * (k1Velocity.x + 2.0 * k2Velocity.x + 2.0 * k3Velocity.x + k4Velocity.x);
            p.position.y = originalPosition.y + deltaT / 6.0 * (k1Velocity.y + 2.0 * k2Velocity.y + 2.0 * k3Velocity.y + k4Velocity.y);
            p.position.z = originalPosition.z + deltaT / 6.0 * (k1Velocity.z + 2.0 * k2Velocity.z + 2.0 * k3Velocity.z + k4Velocity.z);

            // update velocity

            var originalVelocity = this.originalVelocities[i];
            var k1Force = this.k1Forces[i];
            var k2Force = this.k2Forces[i];
            var k3Force = this.k3Forces[i];
            var k4Force = this.k4Forces[i];

            p.velocity.x = originalVelocity.x + deltaT / (6.0 * p.mass) * (k1Force.x + 2.0 * k2Force.x + 2.0 * k3Force.x + k4Force.x);
            p.velocity.y = originalVelocity.y + deltaT / (6.0 * p.mass) * (k1Force.y + 2.0 * k2Force.y + 2.0 * k3Force.y + k4Force.y);
            p.velocity.z = originalVelocity.z + deltaT / (6.0 * p.mass) * (k1Force.z + 2.0 * k2Force.z + 2.0 * k3Force.z + k4Force.z);
          }
        }
      }
    }]);
    return RungeKuttaIntegrator;
  }();

  var _DEFAULT_GRAVITY = 0;
  var _DEFAULT_DRAG = 0.001;

  var ParticleSystem = function () {

    // constructor()
    // constructor(g: number, drag: number)

    function ParticleSystem(gx, gy, gz, drag) {
      babelHelpers_classCallCheck(this, ParticleSystem);

      var _gx = undefined,
          _gy = undefined,
          _gz = undefined,
          _drag = undefined;
      if (arguments.length === 0) {
        _gx = 0;
        _gy = _DEFAULT_GRAVITY;
        _gz = 0;
        _drag = _DEFAULT_DRAG;
      } else if (arguments.length <= 2) {
        _gx = 0;
        _gy = gx;
        _gz = 0;
        _drag = gy;
      } else {
        _gx = gx;
        _gy = gy;
        _gz = gz;
        _drag = drag;
      }

      this.particles = [];
      this.springs = [];
      this.attractions = [];
      this.customForces = [];

      this.integrator = new RungeKuttaIntegrator(this);

      this.gravity = new Vector3D(_gx, _gy, _gz);
      this.drag = _drag || _DEFAULT_DRAG;

      this.hasDeadParticles = false;
    }

    babelHelpers_createClass(ParticleSystem, [{
      key: 'setIntegrator',
      value: function setIntegrator(integrator) {
        switch (integrator) {
          case ParticleSystem.RUNGE_KUTTA:
            this.integrator = new RungeKuttaIntegrator(this);
            break;
          case ParticleSystem.MODIFIED_EULER:
            this.integrator = new ModifiedEulerIntegrator(this);
            break;
        }
      }

      // setGravity(g: number): void

    }, {
      key: 'setGravity',
      value: function setGravity(x, y, z) {
        if (arguments.length === 1) {
          // default down gravity
          this.gravity.set(0, x, 0);
        } else {
          if (y == null || z == null) {
            throw new Error();
          }
          this.gravity.set(x, y, z);
        }
      }
    }, {
      key: 'setDrag',
      value: function setDrag(d) {
        this.drag = d;
      }
    }, {
      key: 'tick',
      value: function tick() {
        var t = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

        // for (let i = 0; i < this.constraints.length; i++) {
        //   this.constraints.solve(i);
        // }
        this.integrator.step(t);
      }
    }, {
      key: 'makeParticle',
      value: function makeParticle() {
        var mass = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
        var x = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
        var y = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
        var z = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

        var p = new Particle(mass);
        p.position.set(x, y, z);
        this.particles.push(p);
        return p;
      }
    }, {
      key: 'makeSpring',
      value: function makeSpring(a, b, ks, d, r) {
        var s = new Spring(a, b, ks, d, r);
        this.springs.push(s);
        return s;
      }
    }, {
      key: 'makeAttraction',
      value: function makeAttraction(a, b, k, minDistance) {
        var m = new Attraction(a, b, k, minDistance);
        this.attractions.push(m);
        return m;
      }
    }, {
      key: 'clear',
      value: function clear() {
        this.particles = [];
        this.springs = [];
        this.attractions = [];
        this.customForces = [];
      }
    }, {
      key: '_applyForces',
      value: function _applyForces() {
        if (!this.gravity.isZero()) {
          for (var i = 0; i < this.particles.length; ++i) {
            var p = this.particles[i];
            p.force.addV(this.gravity);
          }
        }

        for (var i = 0; i < this.particles.length; ++i) {
          var p = this.particles[i];
          p.force.add(p.velocity.x * -this.drag, p.velocity.y * -this.drag, p.velocity.z * -this.drag);
        }

        for (var i = 0; i < this.springs.length; i++) {
          var f = this.springs[i];
          f.apply();
        }

        for (var i = 0; i < this.attractions.length; i++) {
          var f = this.attractions[i];
          f.apply();
        }

        for (var i = 0; i < this.customForces.length; i++) {
          var f = this.customForces[i];
          f.apply();
        }
      }
    }, {
      key: '_clearForces',
      value: function _clearForces() {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.particles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var p = _step.value;

            p.force.clear();
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }, {
      key: 'numberOfParticles',
      value: function numberOfParticles() {
        return this.particles.length;
      }
    }, {
      key: 'numberOfSprings',
      value: function numberOfSprings() {
        return this.springs.length;
      }
    }, {
      key: 'numberOfAttractions',
      value: function numberOfAttractions() {
        return this.attractions.length;
      }
    }, {
      key: 'getParticle',
      value: function getParticle(i) {
        return this.particles[i];
      }
    }, {
      key: 'getSpring',
      value: function getSpring(i) {
        return this.springs[i];
      }
    }, {
      key: 'getAttraction',
      value: function getAttraction(i) {
        return this.attractions[i];
      }
    }, {
      key: 'addCustomForce',
      value: function addCustomForce(f) {
        this.customForces.push(f);
      }
    }, {
      key: 'numberOfCustomForces',
      value: function numberOfCustomForces() {
        return this.customForces.length;
      }
    }, {
      key: 'getCustomForce',
      value: function getCustomForce(i) {
        return this.customForces[i];
      }
    }, {
      key: 'removeParticle',
      value: function removeParticle(a) {
        var i = typeof a === 'number' ? a : this.particles.indexOf(a);
        if (i !== -1) {
          return this.particles.splice(i, 1)[0];
        }
      }
    }, {
      key: 'removeAttraction',
      value: function removeAttraction(a) {
        var i = typeof a === 'number' ? a : this.attractions.indexOf(a);
        if (i !== -1) {
          return this.attractions.splice(i, 1)[0];
        }
      }
    }, {
      key: 'removeSpring',
      value: function removeSpring(a) {
        var i = typeof a === 'number' ? a : this.springs.indexOf(a);
        if (i !== -1) {
          return this.springs.splice(i, 1)[0];
        }
      }
    }, {
      key: 'removeCustomForce',
      value: function removeCustomForce(a) {
        var i = typeof a === 'number' ? a : this.customForces.indexOf(a);
        if (i !== -1) {
          return this.customForces.splice(i, 1)[0];
        }
      }
    }]);
    return ParticleSystem;
  }();

  ParticleSystem.RUNGE_KUTTA = 0;
  ParticleSystem.MODIFIED_EULER = 1;

  var GravityPoint /* extends UnaryForce */ = function () {

    // GravityPoint(Particle a, float v, float x, float y, float z){
    //   super(a,1);
    //   target = new Vector3D(x,y,z);
    //   force = v;
    // }

    // GravityPoint(ParticleSystem s, float v, float x, float y, float z){
    //   super(s,1);
    //   target = new Vector3D(x,y,z);
    //   force = v;
    // }

    function GravityPoint(a, v, p) {
      babelHelpers_classCallCheck(this, GravityPoint);

      // super(a, 1);
      this.a = a;
      this.target = p;
      this.force = v;
      this.on = true;
    }

    // GravityPoint(ParticleSystem s, float v, Vector3D p){
    //   super(s,1);
    //   target = p;
    //   force = v;
    // }

    babelHelpers_createClass(GravityPoint, [{
      key: 'apply',
      value: function apply() {
        var dX = this.target.x - this.a.position.x;
        var dY = this.target.y - this.a.position.y;

        var a2t = new Vector3D(dX, dY);

        // const a2t = this.target.copy();
        // a2t.subtractV(this.a.position);

        // if (a2t.lengthSquared() < 10) {
        //   return;
        // }

        if (a2t.isZero()) {
          a2t.setV(new Vector3D(Math.random(), Math.random(), 0));
        }
        a2t.normalize();

        a2t.multiplyBy(this.force);

        // add on the forces
        if (this.a.isFree()) {
          this.a.force.addV(a2t);
        }
      }

      // Satisfy interface

    }, {
      key: 'turnOff',
      value: function turnOff() {
        this.on = false;
      }
    }, {
      key: 'turnOn',
      value: function turnOn() {
        this.on = true;
      }
    }, {
      key: 'isOn',
      value: function isOn() {
        return this.on;
      }
    }, {
      key: 'isOff',
      value: function isOff() {
        return !this.on;
      }
    }]);
    return GravityPoint;
  }();

  var Integrator = function () {
    function Integrator(v) {
      var k = arguments.length <= 1 || arguments[1] === undefined ? 0.2 : arguments[1];
      babelHelpers_classCallCheck(this, Integrator);

      this.target = v;
      this.value = v;
      this.k = k;
    }

    babelHelpers_createClass(Integrator, [{
      key: "update",
      value: function update() {
        this.value += (this.target - this.value) * this.k;
      }
    }]);
    return Integrator;
  }();

  var ColoredParticle = function (_Particle) {
    babelHelpers_inherits(ColoredParticle, _Particle);
    /*color*/
    function ColoredParticle(p5, c /*color*/, siz, m, p) {
      babelHelpers_classCallCheck(this, ColoredParticle);

      var _this = babelHelpers_possibleConstructorReturn(this, Object.getPrototypeOf(ColoredParticle).call(this, m));

      _this.position.setV(p);
      _this.size = siz;
      _this.p5 = p5;
      _this.c = c;
      _this.target = c;
      _this.s = new Integrator(0, _this.p5.random(0.05, 0.1));
      _this.s.target = siz;
      return _this;
    } /*color*/

    babelHelpers_createClass(ColoredParticle, [{
      key: 'setSize',
      value: function setSize(siz) {
        this.s.target = siz;
      }
    }, {
      key: 'update',
      value: function update() {
        this.s.update();
        this.size = this.s.value;
        this.c = this.p5.lerpColor(this.c, this.target, 0.1);
      }
    }]);
    return ColoredParticle;
  }(Particle);

  var Drag /* extends UnaryForce */ = function () {
    function Drag(a, damping) {
      babelHelpers_classCallCheck(this, Drag);

      this.a = a;
      this.damping = damping;
      this.on = true;
    }

    babelHelpers_createClass(Drag, [{
      key: 'apply',
      value: function apply() {
        if (this.a.isFree()) {
          var v = this.a.velocity.copy();
          v.multiplyBy(-this.damping);
          this.a.force.addV(v);
        }
      }

      // Satisfy interface

    }, {
      key: 'turnOff',
      value: function turnOff() {
        this.on = false;
      }
    }, {
      key: 'turnOn',
      value: function turnOn() {
        this.on = true;
      }
    }, {
      key: 'isOn',
      value: function isOn() {
        return this.on;
      }
    }, {
      key: 'isOff',
      value: function isOff() {
        return !this.on;
      }
    }]);
    return Drag;
  }();

  var data = [{
    "width": 60.0,
    "height": 7.2,
    "circles": [{ "x": 0, "y": 0, "r": 0.01 }]
  }, {
    "width": 38.062,
    "height": 101.424,
    "circles": [{ "x": 9.977, "y": 33.796, "r": 7.208 }, { "x": 24.977, "y": 60.695, "r": 6.495 }, { "x": 20.014, "y": 90.413, "r": 11.012 }, { "x": 22.79, "y": 36.468, "r": 7.312 }, { "x": 16.619, "y": 63.451, "r": 3.445 }, { "x": 20.492, "y": 16.738, "r": 14.74 }, { "x": 28.597, "y": 48.5, "r": 7.467 }, { "x": 11.982, "y": 50.509, "r": 11.982 }]
  }, null, null, null, null, null, null, null, null, null, null, null, null, null, null, {
    "width": 67.049,
    "height": 101.09,
    "circles": [{ "x": 54.045, "y": 75.366, "r": 13.004 }, { "x": 31.942, "y": 87.579, "r": 13.514 }, { "x": 53.933, "y": 26.621, "r": 12.592 }, { "x": 12.933, "y": 27.621, "r": 12.592 }, { "x": 12.229, "y": 74.081, "r": 11.352 }, { "x": 33.516, "y": 13.007, "r": 13.009 }, { "x": 54.808, "y": 50.583, "r": 12.652 }, { "x": 12.601, "y": 51.609, "r": 11.827 }]
  }, {
    "width": 65.611,
    "height": 102.773,
    "circles": [{ "x": 27.729, "y": 35.647, "r": 4.363 }, { "x": 56.133, "y": 93.204, "r": 9.478 }, { "x": 39.886, "y": 47.788, "r": 13.059 }, { "x": 12.017, "y": 31.971, "r": 12.017 }, { "x": 32.007, "y": 67.831, "r": 8.579 }, { "x": 37.225, "y": 17.642, "r": 17.642 }, { "x": 13.577, "y": 92.58, "r": 10.194 }, { "x": 34.728, "y": 87.746, "r": 13.186 }]
  }, {
    "width": 75.4,
    "height": 101.773,
    "circles": [{ "x": 66.242, "y": 92.524, "r": 9.158 }, { "x": 61.175, "y": 30.788, "r": 13.059 }, { "x": 51.508, "y": 55.455, "r": 14.392 }, { "x": 45.508, "y": 87.455, "r": 14.393 }, { "x": 12.184, "y": 34.812, "r": 12.85 }, { "x": 33.796, "y": 68.331, "r": 8.579 }, { "x": 34.514, "y": 17.642, "r": 17.642 }, { "x": 16.782, "y": 85.663, "r": 16.11 }]
  }, {
    "width": 78.8,
    "height": 101.053,
    "circles": [{ "x": 38.933, "y": 10.283, "r": 13.533 }, { "x": 59.933, "y": 22.283, "r": 12.533 }, { "x": 66.242, "y": 73.645, "r": 13.684 }, { "x": 55.742, "y": 48.395, "r": 15.059 }, { "x": 46.083, "y": 89.536, "r": 13.517 }, { "x": 36.083, "y": 49.151, "r": 8.579 }, { "x": 18.079, "y": 80.542, "r": 17.643 }, { "x": 14.86, "y": 21.365, "r": 14.86 }]
  }, {
    "width": 93.136,
    "height": 101.067,
    "circles": [{ "x": 76.702, "y": 17.31, "r": 16.434 }, { "x": 15.562, "y": 15.562, "r": 15.562 }, { "x": 52.04, "y": 47.087, "r": 11.295 }, { "x": 69.572, "y": 87.313, "r": 13.756 }, { "x": 34.411, "y": 53.834, "r": 7.605 }, { "x": 67.241, "y": 62.9, "r": 10.779 }, { "x": 20.106, "y": 41.802, "r": 11.258 }, { "x": 73.024, "y": 42.974, "r": 10.824 }]
  }, {
    "width": 86.086,
    "height": 100.218,
    "circles": [{ "x": 72.833, "y": 14.014, "r": 13.253 }, { "x": 24.843, "y": 15.374, "r": 16.825 }, { "x": 50.805, "y": 11.11, "r": 10.861 }, { "x": 49.427, "y": 49.879, "r": 11.454 }, { "x": 44.499, "y": 88.581, "r": 11.639 }, { "x": 26.602, "y": 42.886, "r": 13.688 }, { "x": 22.102, "y": 82.386, "r": 15.438 }, { "x": 63.287, "y": 72.376, "r": 15.744 }]
  }, {
    "width": 74.992,
    "height": 100.552,
    "circles": [{ "x": 62.965, "y": 76.251, "r": 12.027 }, { "x": 31.644, "y": 23.141, "r": 16.368 }, { "x": 55.523, "y": 10.672, "r": 10.673 }, { "x": 17.248, "y": 81.75, "r": 13.487 }, { "x": 40.867, "y": 45.73, "r": 8.054 }, { "x": 41.977, "y": 88.515, "r": 12.039 }, { "x": 16.527, "y": 52.33, "r": 16.527 }, { "x": 57.098, "y": 54.69, "r": 10.251 }]
  }, {
    "width": 77.74,
    "height": 101.085,
    "circles": [{ "x": 59.856, "y": 47.646, "r": 5.861 }, { "x": 16.118, "y": 16.952, "r": 17.118 }, { "x": 36.868, "y": 85.202, "r": 16.118 }, { "x": 42.413, "y": 11.4, "r": 11.173 }, { "x": 38.804, "y": 42.477, "r": 4.654 }, { "x": 51.315, "y": 32.517, "r": 13.305 }, { "x": 45.858, "y": 58.143, "r": 14.08 }, { "x": 65.114, "y": 12.626, "r": 12.626 }]
  }, {
    "width": 63.658,
    "height": 100.888,
    "circles": [{ "x": 52.115, "y": 75.323, "r": 11.543 }, { "x": 31.972, "y": 15.709, "r": 15.71 }, { "x": 50.412, "y": 34.137, "r": 10.564 }, { "x": 19.114, "y": 53.086, "r": 12.945 }, { "x": 12.669, "y": 74.823, "r": 9.65 }, { "x": 31.33, "y": 87.734, "r": 13.154 }, { "x": 10.584, "y": 30.768, "r": 10.584 }, { "x": 43.125, "y": 54.788, "r": 11.598 }]
  }, {
    "width": 71.23,
    "height": 100.551,
    "circles": [{ "x": 52.014, "y": 69.746, "r": 12.034 }, { "x": 42.01, "y": 90.005, "r": 11.798 }, { "x": 56.744, "y": 19.802, "r": 13.487 }, { "x": 35.458, "y": 56.157, "r": 10.387 }, { "x": 32.891, "y": 10.912, "r": 12.914 }, { "x": 12.016, "y": 24.037, "r": 13.039 }, { "x": 55.464, "y": 45.222, "r": 13.527 }, { "x": 17.393, "y": 46.363, "r": 10.751 }]
  }, null, null, null, null, null, {
    "width": 69.896,
    "height": 101.219,
    "circles": [{ "x": 30.596, "y": 56.397, "r": 7.7 }, { "x": 39.565, "y": 62.779, "r": 5.158 }, { "x": 36.691, "y": 89.457, "r": 11.763 }, { "x": 56.925, "y": 34.149, "r": 12.973 }, { "x": 28.374, "y": 29.808, "r": 4.263 }, { "x": 37.557, "y": 15.031, "r": 15.032 }, { "x": 43.919, "y": 51.39, "r": 9.393 }, { "x": 13.717, "y": 25.976, "r": 13.717 }]
  }, null, {
    "width": 153.167,
    "height": 101.037,
    "circles": [{ "x": 17.463, "y": 82.541, "r": 17.463 }, { "x": 25.088, "y": 52.707, "r": 13.281 }, { "x": 45.748, "y": 22.873, "r": 22.874 }, { "x": 56.078, "y": 68.842, "r": 10.084 }, { "x": 71.007, "y": 39.992, "r": 7.871 }, { "x": 74.279, "y": 58.435, "r": 11.068 }, { "x": 76.098, "y": 85.051, "r": 15.987 }, { "x": 38.584, "y": 69.121, "r": 8.083 }]
  }, {
    "width": 78.417,
    "height": 101.263,
    "circles": [{ "x": 19.224, "y": 82.04, "r": 19.224 }, { "x": 46.427, "y": 16.053, "r": 11.054 }, { "x": 18.575, "y": 16.581, "r": 16.581 }, { "x": 21.579, "y": 48.084, "r": 15.62 }, { "x": 47.075, "y": 47.796, "r": 9.853 }, { "x": 63.752, "y": 32.49, "r": 12.496 }, { "x": 65.373, "y": 62.796, "r": 13.044 }, { "x": 51.915, "y": 86.9, "r": 14.226 }]
  }, {
    "width": 90.0,
    "height": 102.0,
    "circles": [{ "x": 19.163, "y": 53.154, "r": 19.163 }, { "x": 60.139, "y": 15.632, "r": 15.633 }, { "x": 33.607, "y": 25.032, "r": 12.456 }, { "x": 38.758, "y": 81.587, "r": 15.571 }, { "x": 14.804, "y": 27.738, "r": 6.947 }, { "x": 40.531, "y": 9.869, "r": 4.552 }, { "x": 18.828, "y": 77.779, "r": 5.031 }, { "x": 71.312, "y": 83.744, "r": 17.247 }]
  }, {
    "width": 88.431,
    "height": 102.387,
    "circles": [{ "x": 21.456, "y": 85.748, "r": 16.638 }, { "x": 45.643, "y": 9.859, "r": 9.437 }, { "x": 20.139, "y": 17.135, "r": 17.135 }, { "x": 17.88, "y": 51.751, "r": 17.88 }, { "x": 74.524, "y": 47.382, "r": 13.907 }, { "x": 63.374, "y": 23.07, "r": 12.914 }, { "x": 65.386, "y": 73.432, "r": 13.658 }, { "x": 47.704, "y": 88.555, "r": 9.685 }]
  }, {
    "width": 79.04,
    "height": 100.387,
    "circles": [{ "x": 19.952, "y": 82.248, "r": 18.138 }, { "x": 48.139, "y": 12.359, "r": 10.937 }, { "x": 19.135, "y": 19.135, "r": 19.135 }, { "x": 23.125, "y": 51.001, "r": 13.13 }, { "x": 45.666, "y": 46.235, "r": 10.053 }, { "x": 65.87, "y": 17.57, "r": 7.414 }, { "x": 65.382, "y": 84.432, "r": 13.658 }, { "x": 45.45, "y": 75.805, "r": 8.435 }]
  }, {
    "width": 69.783,
    "height": 99.387,
    "circles": [{ "x": 15.452, "y": 84.248, "r": 15.138 }, { "x": 40.889, "y": 10.609, "r": 9.187 }, { "x": 15.885, "y": 15.885, "r": 15.885 }, { "x": 24.125, "y": 41.501, "r": 11.13 }, { "x": 43.416, "y": 43.985, "r": 8.303 }, { "x": 59.87, "y": 14.57, "r": 9.914 }, { "x": 17.913, "y": 60.307, "r": 8.908 }, { "x": 8.95, "y": 48.805, "r": 5.935 }]
  }, {
    "width": 83.924,
    "height": 100.387,
    "circles": [{ "x": 35.04, "y": 86.427, "r": 13.959 }, { "x": 73.156, "y": 56.722, "r": 7.505 }, { "x": 41.042, "y": 14.231, "r": 14.232 }, { "x": 60.912, "y": 74.28, "r": 14.226 }, { "x": 60.23, "y": 54.842, "r": 5.582 }, { "x": 79.09, "y": 68.309, "r": 4.834 }, { "x": 18.43, "y": 63.849, "r": 14.258 }, { "x": 16.496, "y": 32.646, "r": 16.496 }]
  }, {
    "width": 98.284,
    "height": 101.433,
    "circles": [{ "x": 19.702, "y": 82.841, "r": 17.888 }, { "x": 74.163, "y": 54.9, "r": 14.437 }, { "x": 16.885, "y": 17.228, "r": 16.885 }, { "x": 20.625, "y": 49.344, "r": 15.63 }, { "x": 44.416, "y": 54.329, "r": 8.304 }, { "x": 78.12, "y": 20.165, "r": 20.165 }, { "x": 74.632, "y": 85.525, "r": 15.908 }, { "x": 55.913, "y": 47.65, "r": 5.185 }]
  }, {
    "width": 52.785,
    "height": 101.934,
    "circles": [{ "x": 15.702, "y": 92.341, "r": 10.888 }, { "x": 30.247, "y": 44.483, "r": 8.187 }, { "x": 25.385, "y": 9.728, "r": 12.385 }, { "x": 22.375, "y": 73.094, "r": 10.38 }, { "x": 33.916, "y": 59.829, "r": 8.304 }, { "x": 18.537, "y": 55.414, "r": 8.747 }, { "x": 38.882, "y": 89.275, "r": 13.658 }, { "x": 35.831, "y": 72.216, "r": 5.185 }]
  }, {
    "width": 61.789,
    "height": 100.515,
    "circles": [{ "x": 26.707, "y": 87.626, "r": 12.888 }, { "x": 14.918, "y": 9.435, "r": 8.687 }, { "x": 41.89, "y": 31.013, "r": 12.385 }, { "x": 8.63, "y": 77.129, "r": 8.63 }, { "x": 50.171, "y": 49.364, "r": 7.054 }, { "x": 52.625, "y": 13.449, "r": 9.164 }, { "x": 45.887, "y": 69.56, "r": 13.658 }, { "x": 33.733, "y": 9.935, "r": 9.935 }]
  }, {
    "width": 86.089,
    "height": 101.631,
    "circles": [{ "x": 17.202, "y": 84.998, "r": 15.888 }, { "x": 71.703, "y": 85.498, "r": 15.388 }, { "x": 23.052, "y": 30.445, "r": 10.798 }, { "x": 12.385, "y": 12.385, "r": 12.385 }, { "x": 60.08, "y": 62.974, "r": 10.97 }, { "x": 17.132, "y": 55.182, "r": 14.908 }, { "x": 41.914, "y": 45.807, "r": 13.685 }, { "x": 62.044, "y": 26.815, "r": 15 }]
  }, {
    "width": 67.87,
    "height": 98.257,
    "circles": [{ "x": 13.352, "y": 86.665, "r": 10.888 }, { "x": 6.103, "y": 32.557, "r": 6.103 }, { "x": 16.536, "y": 14.885, "r": 14.885 }, { "x": 21.025, "y": 66.418, "r": 10.38 }, { "x": 59.566, "y": 89.485, "r": 8.304 }, { "x": 30.27, "y": 29.058, "r": 4.664 }, { "x": 37.532, "y": 84.599, "r": 13.658 }, { "x": 21.48, "y": 43.373, "r": 12.518 }]
  }, {
    "width": 138.507,
    "height": 100.285,
    "circles": [{ "x": 119.677, "y": 81.057, "r": 18.831 }, { "x": 21.225, "y": 52.878, "r": 13.389 }, { "x": 95.074, "y": 26.9, "r": 19.04 }, { "x": 67.347, "y": 48.688, "r": 16.901 }, { "x": 115.58, "y": 50.268, "r": 11.9 }, { "x": 46.121, "y": 48.168, "r": 4.841 }, { "x": 17.47, "y": 82.815, "r": 17.47 }, { "x": 38.721, "y": 21.982, "r": 21.982 }]
  }, {
    "width": 113.977,
    "height": 101.59,
    "circles": [{ "x": 17.888, "y": 82.498, "r": 17.888 }, { "x": 87.6, "y": 38.806, "r": 10.687 }, { "x": 21.072, "y": 16.885, "r": 16.885 }, { "x": 23.812, "y": 49.001, "r": 15.63 }, { "x": 43.225, "y": 32.182, "r": 9.929 }, { "x": 92.056, "y": 14.571, "r": 14.165 }, { "x": 90.193, "y": 77.807, "r": 23.783 }, { "x": 62.849, "y": 48.807, "r": 15.685 }]
  }, {
    "width": 91.912,
    "height": 101.367,
    "circles": [{ "x": 32.148, "y": 86.479, "r": 14.888 }, { "x": 59.624, "y": 10.781, "r": 9.437 }, { "x": 37.852, "y": 13.01, "r": 13.01 }, { "x": 19.86, "y": 32.673, "r": 13.38 }, { "x": 76.004, "y": 58.055, "r": 15.907 }, { "x": 72.354, "y": 29.492, "r": 12.914 }, { "x": 61.242, "y": 84.479, "r": 14.283 }, { "x": 15.31, "y": 61.102, "r": 15.31 }]
  }, {
    "width": 83.121,
    "height": 101.367,
    "circles": [{ "x": 19.001, "y": 84.477, "r": 16.888 }, { "x": 31.643, "y": 41.614, "r": 8.603 }, { "x": 48.371, "y": 13.01, "r": 13.01 }, { "x": 19.046, "y": 19.338, "r": 19.046 }, { "x": 59.523, "y": 52.053, "r": 15.24 }, { "x": 70.208, "y": 27.159, "r": 12.913 }, { "x": 38.25, "y": 56.978, "r": 7.616 }, { "x": 18.829, "y": 55.435, "r": 14.643 }]
  }, {
    "width": 95.758,
    "height": 100.467,
    "circles": [{ "x": 28.051, "y": 74.866, "r": 16.83 }, { "x": 76.583, "y": 87.742, "r": 6.391 }, { "x": 56.523, "y": 67.77, "r": 5.333 }, { "x": 50.84, "y": 18.111, "r": 18.112 }, { "x": 77.92, "y": 65.745, "r": 16.203 }, { "x": 80.355, "y": 34.068, "r": 15.402 }, { "x": 56.049, "y": 86.643, "r": 13.825 }, { "x": 19.658, "y": 39.497, "r": 19.658 }]
  }, {
    "width": 89.58,
    "height": 101.367,
    "circles": [{ "x": 20.835, "y": 82.644, "r": 18.723 }, { "x": 75.644, "y": 80.614, "r": 13.937 }, { "x": 48.372, "y": 13.01, "r": 13.01 }, { "x": 18.047, "y": 19.338, "r": 18.047 }, { "x": 62.19, "y": 55.053, "r": 14.24 }, { "x": 68.208, "y": 29.159, "r": 12.913 }, { "x": 42.084, "y": 62.478, "r": 10.449 }, { "x": 20.081, "y": 50.352, "r": 14.893 }]
  }, {
    "width": 71.675,
    "height": 101.178,
    "circles": [{ "x": 13.112, "y": 78.972, "r": 13.112 }, { "x": 38.092, "y": 87.86, "r": 13.317 }, { "x": 48.98, "y": 14.661, "r": 14.662 }, { "x": 21.756, "y": 22.78, "r": 13.582 }, { "x": 51.994, "y": 54.519, "r": 13.607 }, { "x": 60.451, "y": 78.03, "r": 11.224 }, { "x": 30.391, "y": 45.209, "r": 9.985 }, { "x": 15.02, "y": 40.868, "r": 5.551 }]
  }, {
    "width": 82.549,
    "height": 103.484,
    "circles": [{ "x": 69.437, "y": 13.111, "r": 13.112 }, { "x": 41.917, "y": 90.167, "r": 13.317 }, { "x": 41.806, "y": 17.967, "r": 14.662 }, { "x": 13.582, "y": 17.253, "r": 13.582 }, { "x": 38.486, "y": 46.159, "r": 13.607 }, { "x": 46.109, "y": 67.837, "r": 10.057 }, { "x": 58.632, "y": 27.118, "r": 4.818 }, { "x": 26.796, "y": 30.453, "r": 5.551 }]
  }, {
    "width": 93.805,
    "height": 100.678,
    "circles": [{ "x": 78.536, "y": 21.143, "r": 15.268 }, { "x": 15.562, "y": 15.562, "r": 15.562 }, { "x": 21.04, "y": 67.085, "r": 15.295 }, { "x": 71.04, "y": 72.085, "r": 17.295 }, { "x": 61.492, "y": 92.533, "r": 6.605 }, { "x": 43.741, "y": 86.399, "r": 14.28 }, { "x": 12.106, "y": 42.469, "r": 11.258 }, { "x": 81.024, "y": 45.973, "r": 10.824 }]
  }, {
    "width": 101.178,
    "height": 100.11,
    "circles": [{ "x": 86.484, "y": 14.693, "r": 14.693 }, { "x": 19.01, "y": 21.675, "r": 19.01 }, { "x": 29.392, "y": 54.119, "r": 16.323 }, { "x": 75.33, "y": 58.999, "r": 14.517 }, { "x": 56.555, "y": 59.333, "r": 5.448 }, { "x": 50.684, "y": 81.401, "r": 18.708 }, { "x": 38.334, "y": 35.052, "r": 5.878 }, { "x": 79.535, "y": 36.923, "r": 8.884 }]
  }, {
    "width": 139.237,
    "height": 100.618,
    "circles": [{ "x": 121.042, "y": 18.196, "r": 18.195 }, { "x": 22.225, "y": 47.74, "r": 13.389 }, { "x": 97.979, "y": 77.622, "r": 22.944 }, { "x": 67.347, "y": 55.93, "r": 16.902 }, { "x": 108.579, "y": 44.851, "r": 11.9 }, { "x": 46.121, "y": 52.45, "r": 4.841 }, { "x": 17.47, "y": 17.803, "r": 17.47 }, { "x": 38.721, "y": 78.635, "r": 21.982 }]
  }, {
    "width": 100.507,
    "height": 100.619,
    "circles": [{ "x": 83.729, "y": 16.779, "r": 16.778 }, { "x": 34.001, "y": 64.411, "r": 11.144 }, { "x": 80.135, "y": 79.644, "r": 20.004 }, { "x": 55.625, "y": 58.788, "r": 12.588 }, { "x": 64.298, "y": 37.152, "r": 12.458 }, { "x": 36.516, "y": 43.826, "r": 11.124 }, { "x": 18.655, "y": 24.715, "r": 16.109 }, { "x": 16.581, "y": 84.037, "r": 16.581 }]
  }, {
    "width": 87.462,
    "height": 101.119,
    "circles": [{ "x": 16.778, "y": 16.779, "r": 16.778 }, { "x": 50.589, "y": 71.661, "r": 7.727 }, { "x": 40.123, "y": 68.395, "r": 5.254 }, { "x": 49.934, "y": 53.003, "r": 12.838 }, { "x": 29.225, "y": 41.668, "r": 10.973 }, { "x": 61.991, "y": 37.826, "r": 7.79 }, { "x": 71.353, "y": 17.215, "r": 16.109 }, { "x": 38.177, "y": 87.288, "r": 13.831 }]
  }, {
    "width": 95.934,
    "height": 101.411,
    "circles": [{ "x": 18.363, "y": 16.891, "r": 15.363 }, { "x": 36.095, "y": 61.274, "r": 11.408 }, { "x": 54.278, "y": 44.288, "r": 14.559 }, { "x": 43.409, "y": 19.971, "r": 13.017 }, { "x": 72.116, "y": 17.642, "r": 17.642 }, { "x": 17.863, "y": 84.391, "r": 17.863 }, { "x": 45.409, "y": 89.971, "r": 13.017 }, { "x": 73.616, "y": 85.142, "r": 17.142 }]
  }];

  var Letter = function () {
    babelHelpers_createClass(Letter, null, [{
      key: 'loadLetters',
      value: function loadLetters() {
        var letters = [];

        for (var i = 0; i < data.length; i++) {
          if (data[i]) {
            letters[i] = new Letter(data[i]);
            if (i >= 33 && i <= 58) {
              letters[i + 32] = letters[i]; // upper to lower
            }
          }
        }

        return letters;
      }
    }]);

    function Letter(data) {
      babelHelpers_classCallCheck(this, Letter);

      this.parse(data);
    }

    babelHelpers_createClass(Letter, [{
      key: 'parse',
      value: function parse(data) {
        this.x = [];
        this.y = [];
        this.r = [];

        var j = 0;

        var kids = data.circles;
        for (var i = 0; i < kids.length; i++) {
          this.x[j] = kids[i].x;
          this.y[j] = kids[i].y;
          this.r[j] = kids[i].r;
          j++;
        }

        // fill in the blanks
        for (; j < 8; j++) {
          this.x[j] = -1;
          this.y[j] = -1;
          this.r[j] = 0;
          // println("blank");
        }

        // find min and max
        var minX = 1000;
        var maxX = -1000;
        var minY = 1000;
        var maxY = -1000;
        for (var i = 0; i < 8; i++) {
          if (this.x[i] !== -1 && this.y[i] !== -1) {
            minX = Math.min(minX, this.x[i] - this.r[i] * 0.5);
            maxX = Math.max(maxX, this.x[i] + this.r[i] * 0.5);
            minY = Math.min(minY, this.y[i] - this.r[i] * 0.5);
            maxY = Math.max(maxY, this.y[i] + this.r[i] * 0.5);
          }
        }

        // set width and height
        this.w = maxX - minX;
        this.h = maxY - minY;

        if (this.w === 0 || this.h === 0) {
          this.w += 1;
          this.h += 1;
        }

        // center points
        for (var i = 0; i < 8; i++) {
          if (this.x[i] !== -1 && this.y[i] !== -1) {
            this.x[i] = map(this.x[i], minX, maxX, -this.w * 0.5, this.w * 0.5);
            this.y[i] = map(this.y[i], minY, maxY, -this.h * 0.5, this.h * 0.5);
          }
        }
      }
    }]);
    return Letter;
  }();

  function map(n, start1, stop1, start2, stop2) {
    return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
  }

  var BubbleLetter = function () {
    function BubbleLetter(p5, w, center, l) {
      babelHelpers_classCallCheck(this, BubbleLetter);

      this.p5 = p5;
      this.world = w;

      this.bubbles = []; //new ColoredParticle[8];
      this.anchors = []; //new Particle[8];
      this.connections = []; //new Spring[8];
      this.drags = []; //new Force[8];

      this.surrounding = []; //new LinkedList();
      this.surroundingForce = [];

      this.center = center || new Vector3D();

      for (var i = 0; i < 8; i++) {
        this.bubbles[i] = new ColoredParticle(this.p5, this.letterColor(), 0, 10, new Vector3D(this.center.x + p5.random(-20, 20), this.center.y + p5.random(-20, 20), 0));
        this.world.particles.push(this.bubbles[i]);
        this.anchors[i] = this.world.makeParticle(0, 1, this.center.x, this.center.y, 0);
        // this.anchors[i].makeInvisible();
        this.anchors[i].makeFixed();

        this.connections[i] = this.world.makeSpring(this.bubbles[i], this.anchors[i], 3, 3, 0);
        this.drags[i] = new Drag(this.bubbles[i], 0.96);
        this.world.addCustomForce(this.drags[i]);
        // this.connections[i].turnOff();
      }

      if (l) {
        this.make(l);
      }
    }

    babelHelpers_createClass(BubbleLetter, [{
      key: 'detachLetter',
      value: function detachLetter() {
        this.removeSurrounding();

        this.p5.colorMode(this.p5.HSB, 1);
        for (var i = 0; i < this.bubbles.length; i++) {
          // Move bubble to surrounding
          this.bubbles[i].setMass(this.bubbles[i].mass * 0.01);
          this.bubbles[i].setSize(this.bubbles[i].s.target * 0.75);
          this.bubbles[i].target = this.surroundingColor(); // this.p5.color((0.8 + this.p5.random(0.3)) % 1, this.p5.random(0.5, 0.85), this.p5.random(0.65, 0.8));
          this.surrounding.push(this.bubbles[i]);

          // Apply initial surrounding force
          var sf = new GravityPoint(this.bubbles[i], -0.05, this.connections[i].b.position); // new Vector3D(this.p5.random(-800, 800), this.p5.random(-800, 800), 0));// this.center);
          this.world.addCustomForce(sf);
          this.surroundingForce.push(sf);

          // Create a new empty bubble
          this.bubbles[i] = new ColoredParticle(this.p5, this.letterColor(), 0, 10, new Vector3D(this.p5.random(-20, 20), this.p5.random(-20, 20), 0));
          this.world.particles.push(this.bubbles[i]);

          // Refocus active forces
          this.connections[i].a = this.bubbles[i];
          this.drags[i].a = this.bubbles[i];
        }
      }
    }, {
      key: 'addSurrounding',
      value: function addSurrounding(x, y) {
        this.p5.colorMode(this.p5.HSB, 1);
        var p = new ColoredParticle(this.p5, this.surroundingColor(), this.p5.random(5, 25), 0.5, new Vector3D(x, y, 0));
        this.world.particles.push(p);
        this.surrounding.push(p);

        var sf = new GravityPoint(p, 1, this.center);
        this.world.addCustomForce(sf);
        this.surroundingForce.push(sf);
      }
    }, {
      key: 'removeSurrounding',
      value: function removeSurrounding() {
        for (var i = 0; i < this.surroundingForce.length; i++) {
          this.surroundingForce[i].force -= 0.05;
          this.surroundingForce[i].target.x += this.p5.random(-50, 50);
          this.surroundingForce[i].target.y += this.p5.random(-50, 50);
        }
      }
    }, {
      key: 'surroundingColor',
      value: function surroundingColor() /*color*/{
        return this.p5.color((0.85 + this.p5.random(0.25)) % 1, this.p5.random(0.5, 0.95), this.p5.random(0.35, 0.75));
      }
    }, {
      key: 'letterColor',
      value: function letterColor() /*color*/{
        return this.p5.color(0.35 + this.p5.random(0.25), this.p5.random(0.55, 0.8), this.p5.random(0.65, 0.8));
      }
    }, {
      key: 'update',
      value: function update() {
        for (var i = 0; i < this.bubbles.length; i++) {
          this.bubbles[i].update();
        }

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.surrounding[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var bubble = _step.value;

            bubble.update();
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }, {
      key: 'drawSurround',
      value: function drawSurround() {

        this.p5.noStroke();
        this.p5.colorMode(this.p5.RGB, 255);

        for (var i = 0; i < this.surrounding.length; i++) {
          var bubble = this.surrounding[i];

          // ListIterator surroundingIter = surrounding.listIterator();
          // while( surroundingIter.hasNext() ){
          //   ColoredParticle bubble = (ColoredParticle) surroundingIter.next();
          //color f = lerpColor(bubble.c,deuteranopia(bubble.c),blindness);
          //fill( f );
          this.p5.fill(bubble.c);
          this.p5.ellipse(bubble.position.x, bubble.position.y, bubble.size, bubble.size);

          //offscreen?
          if (bubble.position.x > this.p5.width * 2 || bubble.position.x < -this.p5.width || bubble.position.y > this.p5.height * 2 || bubble.position.y < -this.p5.height) {
            this.world.removeParticle(bubble);
            this.world.removeCustomForce(this.surroundingForce[i]);

            // remove index.
            this.surrounding[i] = this.surrounding[this.surrounding.length - 1];
            this.surroundingForce[i] = this.surroundingForce[this.surroundingForce.length - 1];
            this.surrounding.length -= 1;
            this.surroundingForce.length -= 1;
            i--;
          }
        }
      }
    }, {
      key: 'draw',
      value: function draw() {

        this.p5.noStroke();
        this.p5.colorMode(this.p5.RGB, 255);

        for (var i = 0; i < this.bubbles.length; i++) {
          //color f = lerpColor(bubbles[i].c,deuteranopia(bubbles[i].c),blindness);
          //fill( f );
          this.p5.fill(this.bubbles[i].c);
          this.p5.ellipse(this.bubbles[i].position.x, this.bubbles[i].position.y, this.bubbles[i].size, this.bubbles[i].size);
        }
      }
    }, {
      key: 'make',
      value: function make(letter) {
        for (var i = 0; i < 8; i++) {
          var letterPos = new Vector3D(letter.x[i], letter.y[i], 0);
          letterPos.addV(this.center);
          this.anchors[i].position.setV(letterPos);

          // if (this.connections[i].isOff()) {

          letterPos.multiplyBy(0.85);

          this.bubbles[i].position.setV(letterPos);
          // }

          this.bubbles[i].setSize(letter.r[i] * 2);
          this.bubbles[i].setMass(letter.r[i]);

          //       if (letter.r[i] <= 0.1) {
          // //        connections[i].turnOff();
          //       } else {
          //         this.connections[i].turnOn();
          //       }
        }
      }
    }]);
    return BubbleLetter;
  }();

  var Collision = function () {
    function Collision(world, k) {
      babelHelpers_classCallCheck(this, Collision);

      this.world = world;
      this.strength = k;
      this.on = true;
    }

    babelHelpers_createClass(Collision, [{
      key: 'apply',
      value: function apply() {
        var particles = this.world.particles;

        for (var i = 0; i < particles.length; i++) {
          var a = particles[i];
          if (a.size) {
            for (var j = i + 1; j < particles.length; j++) {
              var b = particles[j];
              if (b.size) {
                this.applyTo(a, b);
              }
            }
          }
        }
      }
    }, {
      key: 'applyTo',
      value: function applyTo(a, b) {
        var minDist = (b.size + a.size) * 0.5;

        var dX = b.position.x - a.position.x;

        if (dX > minDist || -dX < -minDist) {
          return;
        }

        var dY = b.position.y - a.position.y;

        if (dY > minDist || -dY < -minDist) {
          return;
        }

        var axis = new Vector3D(dX, dY, 0);

        var axisLenSq = axis.lengthSquared();

        if (axisLenSq > minDist * minDist) {
          return;
        }

        var currentDistance = Math.sqrt(axisLenSq);
        var unitAxis = new Vector3D(axis.x / currentDistance, axis.y / currentDistance, 0);
        var relDist = currentDistance - minDist;
        var remove = relDist;
        var impulse = remove / (a.invMass + b.invMass);

        var I = unitAxis.multiplyBy(impulse);

        a.force.addV(I);
        b.force.subtractV(I);
      }

      // Satisfy interface

    }, {
      key: 'turnOff',
      value: function turnOff() {
        this.on = false;
      }
    }, {
      key: 'turnOn',
      value: function turnOn() {
        this.on = true;
      }
    }, {
      key: 'isOn',
      value: function isOn() {
        return this.on;
      }
    }, {
      key: 'isOff',
      value: function isOff() {
        return !this.on;
      }
    }]);
    return Collision;
  }();

  var WorldDrag /* extends UnaryForce */ = function () {
    function WorldDrag(world, damping) {
      babelHelpers_classCallCheck(this, WorldDrag);

      this.world = world;
      this.damping = damping;
      this.on = true;
    }

    babelHelpers_createClass(WorldDrag, [{
      key: 'apply',
      value: function apply() {
        for (var i = 0; i < this.world.particles.length; i++) {
          var particle = this.world.particles[i];
          if (particle.isFree()) {
            var v = particle.velocity.copy();
            v.multiplyBy(-this.damping);
            particle.force.addV(v);
          }
        }
      }

      // Satisfy interface

    }, {
      key: 'turnOff',
      value: function turnOff() {
        this.on = false;
      }
    }, {
      key: 'turnOn',
      value: function turnOn() {
        this.on = true;
      }
    }, {
      key: 'isOn',
      value: function isOn() {
        return this.on;
      }
    }, {
      key: 'isOff',
      value: function isOff() {
        return !this.on;
      }
    }]);
    return WorldDrag;
  }();

  var letterSpacing = 1.8;

  function BubbletypeWord(p5) {

    var world = new ParticleSystem();
    world.addCustomForce(new Collision(world, 1.5));
    world.addCustomForce(new WorldDrag(world, 0.01));

    var word = [];

    var letters = Letter.loadLetters();

    var blindness = 0;

    var lastSec = 0;

    // boolean renderPDF = false;

    p5.setup = function setup() {
      var docElem = document.documentElement;
      p5.createCanvas(docElem.clientWidth, docElem.clientHeight);
      p5.colorMode(p5.HSB, 1);
      p5.smooth();

      //letter = new BubbleLetter(world);

      // word = new BubbleLetter[8]; // 8 max
      for (var i = 0; i < 8; i++) {
        word[i] = new BubbleLetter(p5, world);
      }
    };

    p5.draw = function draw() {
      p5.colorMode(p5.HSB, 1);

      // if (renderPDF){
      //   beginRecord(PDF,"vector"+frameCount+".pdf");
      // }

      p5.background(0);
      p5.smooth();

      var words = ['bubbles', 'the', 'quick', 'brown', 'fox', 'jumped', 'over', 'the', 'lazy', 'dog'];

      var thisSec = Math.floor(p5.second() / 2);
      if (thisSec !== lastSec) {
        lastSec = thisSec;
        drawWord(words[thisSec % words.length]);

        // if (thisSec % words.length === 0) {
        //   for (let i = 0; i < word.length; i++ ) {
        //     word[i].removeSurrounding();
        //   }

        // //  drawWord( ( 60-second() )+"" );

        // }
      }

      blindness = p5.norm(p5.mouseX, 0, p5.width);

      p5.push();
      p5.translate(p5.width / 2, p5.height / 2);

      // update letter
      //letter.update();
      for (var i = 0; i < word.length; i++) {
        word[i].update();
      }

      world.tick();

      // draw letter
      //letter.draw();

      for (var i = 0; i < word.length; i++) {
        word[i].drawSurround();
      }

      for (var i = 0; i < word.length; i++) {
        word[i].draw();
      }

      // if(renderPDF){
      //   renderPDF = false;
      //   endRecord();
      // }

      // if( second() != lastSec ){
      //   //saveFrame("frame###.png");
      //   renderPDF = true;
      // }

      if (!window.word) {
        window.word = word;
        console.log(word);
      }

      p5.pop();
    };

    p5.mousePressed = function mousePressed() {
      //letter.addSurrounding(mouseX-width/2,mouseY-height/2);//world.makeParticle(random(5,25),1,mouseX-width/2,mouseY-height/2,0);
    };

    p5.mouseDragged = function mouseDragged() {
      p5.mousePressed();
    };

    p5.keyPressed = function keyPressed() {

      if (p5.keyCode === p5.BACKSPACE || p5.keyCode === p5.DELETE) {
        for (var i = 0; i < word.length; i++) {
          word[i].removeSurrounding();
        }
      }

      var k = p5.key - 32;
      if (k >= letters.length || k < 0) {
        return;
      }

      var l = letters[k];
      if (l == null) {
        return;
      }

      if (p5.key !== ' '.charCodeAt(0)) {
        word[0].detachLetter();
      } else {
        word[0].removeSurrounding();
      }

      word[0].make(l);
    };

    function getLetter(c /* char */) {
      var k = c - 32;
      if (k >= letters.length || k < 0) {
        return getLetter(' '.charCodeAt(0));
      }

      var l = letters[k];
      if (l == null) {
        return getLetter(' '.charCodeAt(0));
      }

      return l;
    }

    function drawWord(w) {

      for (var i = 0; i < word.length; i++) {
        word[i].detachLetter();
      }

      var wordWidth = 0;
      for (var i = 0; i < Math.min(word.length, w.length); i++) {
        wordWidth += getLetter(w.charCodeAt(i)).w * letterSpacing;
      }

      var offset = -0.5 * wordWidth;
      for (var i = 0; i < Math.min(word.length, w.length); i++) {
        var l = getLetter(w.charCodeAt(i));
        offset += l.w * 0.5 * letterSpacing;
        word[i].center = new Vector3D(offset, 0, 0);
        offset += l.w * 0.5 * letterSpacing;
        word[i].make(l);
      }

      /*  if( key != ' ')
          word[0].detachLetter();
        else
          word[0].removeSurrounding();
         word[0].make(l);
        */
    }

    // function loadLetters(): void {
    //   letters = new Array(96); //new Letter[96];

    //   // File letterFolder = new File(dataPath(""));
    //   // File[] letterFiles = letterFolder.listFiles(new SVGOnly());
    //   for (let i = 0; i < letterFiles.length; i++) {
    //     let name = letterFiles[i].getName();
    //     name = name.substring(0, name.indexOf(".")); // cut extension

    //     let index = name.length() === 2 ? parseInt(name) - 32 : name.charCodeAt(0) - 32;

    //     letters[index] = new Letter(letterFiles[i]);

    //     if (index >= ('a'.charCodeAt(0) - 32) && index <= ('z'.charCodeAt(0) - 32)) {
    //       letters[ index + ('A'.charCodeAt(0)-'a'.charCodeAt(0)) ] = letters[index];
    //     }
    //   }
    // }

    // class SVGOnly implements FileFilter{
    //   boolean accept( File f ){
    //     return f.getName().indexOf(".svg") != -1;
    //   }
    // }
  }

  var myp5 = new p5(BubbletypeWord, 'p5');

})(p5);