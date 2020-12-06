from django.dispatch import Signal, receiver
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from rest.getters.user import get_display_name, get_id

channel_layer = get_channel_layer()


participants_changed = Signal(
    providing_args=["channel_room", "added", "removed"]
)


@receiver(participants_changed)
def broadcast_participants(sender, channel_room, **kwargs):
    """
    Sends the updated list of participants to all of the users in this world.
    """

    participants = []
    for participant in channel_room.get_participants():
        user = participant.user

        # format the participant's data
        participant = {
            'id': get_id(user),
            'display_name': get_display_name(user)
        }
        participants.append(participant)

    # broadcast a signal with all of the participants
    async_to_sync(channel_layer.group_send)(
        channel_room.channel_name,
        {
            'type': 'participants',
            'payload': {'participants': participants}
        }
    )