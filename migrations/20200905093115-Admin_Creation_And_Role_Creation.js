module.exports = {
  async up(db) {

    await db.collection('roles').insertMany([{ roleName: 'Admin' }, { roleName: 'Parent' }]);

    let adminRole = await db.collection('roles').findOne({ roleName: 'Admin' });
    await db.collection('users').insertOne({ name: 'Admin', password: 'admin', mobile: '7092731152', email: 'admin@gmail.com', roleId: adminRole._id.toString() });

  },

  async down(db) {
    await db.collection('roles').deleteMany();
  }
};
