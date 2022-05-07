// Metods to process informattion a productos
import User from "../models/User";
import Draw from "../models/Draw";

export const generate = async (req, res) => {

  try {

    const quorum = await User.find(
      { $and: [{ wasSelected: false }, { isActive: true }, { email: { $ne: 'admin@localhost' } }] }
    );

    if (quorum.length < 1) throw new Error('There are no more users to select, reset draw');

    const theList = quorum.map(obj => { return obj._id });

    const positions = await Draw.find().populate('meeting', ['name']);

    if (quorum.length < positions.length) throw new Error('There are no more users to select, reset draw');

    const promisesPotitions = positions.map(async (positionOfMeeting) => {

      let indexElement = 0;
      if (theList.length > 0) {
        indexElement = Math.floor(Math.random() * theList.length);
      }
      const randomElement = theList[indexElement];

      const index = theList.indexOf(randomElement);
      if (index > -1) {
        theList.splice(index, 1);
      }

      positionOfMeeting.user = randomElement;
      await positionOfMeeting.save();

      const userSelected = await User.findByIdAndUpdate(randomElement, { wasSelected: positionOfMeeting.countAsSelected }, { new: true });

      return { meeting: positionOfMeeting.meeting.name, position: positionOfMeeting.name, email: userSelected.email };
    });

    Promise.all(promisesPotitions).then(function (results) {
      return res.status(200).json(results);
    });

  } catch (error) {
    console.error('Missing generate draw...!!!', error);
    res.status(500).json({ "message": error.message });
  }
}

export const list = async (req, res) => {

  try {
    const authoritie = await Draw
      .find({ user: { $exists: true, $ne: null } })
      .populate("user", ["email"])
      .populate("meeting", ["name"]);

    if (authoritie.length < 1) throw new Error('Draw empty...!!!');
  
    const draw = authoritie.map(row => {
      const user = row.user;
      const meeting = row.meeting;
      return { role: row.name, meeting: meeting.name, assingTo: user.email };
    })
    res.status(200).json({ draw });
    
  } catch (error) {
    console.error('Missing list draw...!!!', error);
    res.status(500).json({ "message": error.message });    
  }
}

export const reset = async (req, res) => {

  try {
    await User.updateMany({ wasSelected: false });
    await Draw.updateMany({ user: null });
    res.status(202).json();

  } catch (error) {
    console.error('Missing reset draws...!!!', error);
    res.status(500).json({ "message": error.message });
  }
}

