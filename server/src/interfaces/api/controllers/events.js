const eventsService = require("../../../services/events");
const { generateEventImage, generateInventoryImage } = require("../../../services/images");

async function getEvent(req, res) {
  const { eventId } = req.params;

  const event = await eventsService.getEvent(eventId);
  if (!event) return res.sendStatus(404);

  return res.send(event);
}

async function getEventImage(req, res) {
  const { eventId } = req.params;

  const event = await eventsService.getEvent(eventId);
  if (!event) return res.sendStatus(404);

  const eventImage = await generateEventImage(event);
  return res.set("Content-Disposition", `inline; filename="${event.EventId}-event.png"`).type("png").send(eventImage);
}

async function getEventInventoryImage(req, res) {
  const { eventId } = req.params;

  const event = await eventsService.getEvent(eventId);
  if (!event) return res.sendStatus(404);
  const inventory = event.Victim.Inventory.filter((i) => i != null);
  if (!inventory || inventory.length === 0) return res.sendStatus(404);

  const eventInventoryImage = await generateInventoryImage(inventory);
  return res
    .set("Content-Disposition", `inline; filename="${event.EventId}-inventory.png"`)
    .type("png")
    .send(eventInventoryImage);
}

module.exports = {
  getEvent,
  getEventImage,
  getEventInventoryImage,
};
