// This module allows snapping of the size of targets during resize
// interactions.
import extend from '@interactjs/utils/extend';
import * as is from '@interactjs/utils/is';
import snap from './pointer';
function start(arg) {
    const { interaction, state } = arg;
    const { options } = state;
    const edges = interaction.prepared.edges;
    if (!edges) {
        return null;
    }
    arg.state = {
        options: {
            relativePoints: [{
                    x: edges.left ? 0 : 1,
                    y: edges.top ? 0 : 1,
                }],
            origin: { x: 0, y: 0 },
            offset: options.offset || 'self',
            range: options.range,
        },
    };
    state.targetFields = state.targetFields || [
        ['width', 'height'],
        ['x', 'y'],
    ];
    snap.start(arg);
    state.offsets = arg.state.offsets;
    arg.state = state;
}
function set(arg) {
    const { interaction, state, coords } = arg;
    const { options, offsets } = state;
    const relative = {
        x: coords.x - offsets[0].x,
        y: coords.y - offsets[0].y,
    };
    state.options = extend({}, options);
    state.options.targets = [];
    for (const snapTarget of (options.targets || [])) {
        let target;
        if (is.func(snapTarget)) {
            target = snapTarget(relative.x, relative.y, interaction);
        }
        else {
            target = snapTarget;
        }
        if (!target) {
            continue;
        }
        for (const [xField, yField] of state.targetFields) {
            if (xField in target || yField in target) {
                target.x = target[xField];
                target.y = target[yField];
                break;
            }
        }
        state.options.targets.push(target);
    }
    snap.set(arg);
    state.options = options;
}
const snapSize = {
    start,
    set,
    defaults: {
        enabled: false,
        range: Infinity,
        targets: null,
        offset: null,
    },
};
export default snapSize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l6ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsbUVBQW1FO0FBQ25FLGdCQUFnQjtBQUVoQixPQUFPLE1BQU0sTUFBTSwwQkFBMEIsQ0FBQTtBQUM3QyxPQUFPLEtBQUssRUFBRSxNQUFNLHNCQUFzQixDQUFBO0FBQzFDLE9BQU8sSUFBSSxNQUFNLFdBQVcsQ0FBQTtBQUU1QixTQUFTLEtBQUssQ0FBRSxHQUFHO0lBQ2pCLE1BQU0sRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLEdBQUcsR0FBRyxDQUFBO0lBQ2xDLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxLQUFLLENBQUE7SUFDekIsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUE7SUFFeEMsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUFFLE9BQU8sSUFBSSxDQUFBO0tBQUU7SUFFM0IsR0FBRyxDQUFDLEtBQUssR0FBRztRQUNWLE9BQU8sRUFBRTtZQUNQLGNBQWMsRUFBRSxDQUFDO29CQUNmLENBQUMsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3JCLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3JCLENBQUM7WUFDRixNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDdEIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLElBQUksTUFBTTtZQUNoQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7U0FDckI7S0FDRixDQUFBO0lBRUQsS0FBSyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsWUFBWSxJQUFJO1FBQ3pDLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQztRQUNuQixDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7S0FDWCxDQUFBO0lBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNmLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUE7SUFFakMsR0FBRyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7QUFDbkIsQ0FBQztBQUVELFNBQVMsR0FBRyxDQUFFLEdBQUc7SUFDZixNQUFNLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUE7SUFDMUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsR0FBRyxLQUFLLENBQUE7SUFDbEMsTUFBTSxRQUFRLEdBQUc7UUFDZixDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMzQixDQUFBO0lBRUQsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQ25DLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQTtJQUUxQixLQUFLLE1BQU0sVUFBVSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsRUFBRTtRQUNoRCxJQUFJLE1BQU0sQ0FBQTtRQUVWLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN2QixNQUFNLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQTtTQUN6RDthQUNJO1lBQ0gsTUFBTSxHQUFHLFVBQVUsQ0FBQTtTQUNwQjtRQUVELElBQUksQ0FBQyxNQUFNLEVBQUU7WUFBRSxTQUFRO1NBQUU7UUFFekIsS0FBSyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUU7WUFDakQsSUFBSSxNQUFNLElBQUksTUFBTSxJQUFJLE1BQU0sSUFBSSxNQUFNLEVBQUU7Z0JBQ3hDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO2dCQUN6QixNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFFekIsTUFBSzthQUNOO1NBQ0Y7UUFFRCxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7S0FDbkM7SUFFRCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBRWIsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7QUFDekIsQ0FBQztBQUVELE1BQU0sUUFBUSxHQUFHO0lBQ2YsS0FBSztJQUNMLEdBQUc7SUFDSCxRQUFRLEVBQUU7UUFDUixPQUFPLEVBQUUsS0FBSztRQUNkLEtBQUssRUFBSSxRQUFRO1FBQ2pCLE9BQU8sRUFBRSxJQUFJO1FBQ2IsTUFBTSxFQUFFLElBQUk7S0FDYjtDQUNGLENBQUE7QUFFRCxlQUFlLFFBQVEsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRoaXMgbW9kdWxlIGFsbG93cyBzbmFwcGluZyBvZiB0aGUgc2l6ZSBvZiB0YXJnZXRzIGR1cmluZyByZXNpemVcbi8vIGludGVyYWN0aW9ucy5cblxuaW1wb3J0IGV4dGVuZCBmcm9tICdAaW50ZXJhY3Rqcy91dGlscy9leHRlbmQnXG5pbXBvcnQgKiBhcyBpcyBmcm9tICdAaW50ZXJhY3Rqcy91dGlscy9pcydcbmltcG9ydCBzbmFwIGZyb20gJy4vcG9pbnRlcidcblxuZnVuY3Rpb24gc3RhcnQgKGFyZykge1xuICBjb25zdCB7IGludGVyYWN0aW9uLCBzdGF0ZSB9ID0gYXJnXG4gIGNvbnN0IHsgb3B0aW9ucyB9ID0gc3RhdGVcbiAgY29uc3QgZWRnZXMgPSBpbnRlcmFjdGlvbi5wcmVwYXJlZC5lZGdlc1xuXG4gIGlmICghZWRnZXMpIHsgcmV0dXJuIG51bGwgfVxuXG4gIGFyZy5zdGF0ZSA9IHtcbiAgICBvcHRpb25zOiB7XG4gICAgICByZWxhdGl2ZVBvaW50czogW3tcbiAgICAgICAgeDogZWRnZXMubGVmdCA/IDAgOiAxLFxuICAgICAgICB5OiBlZGdlcy50b3AgPyAwIDogMSxcbiAgICAgIH1dLFxuICAgICAgb3JpZ2luOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgIG9mZnNldDogb3B0aW9ucy5vZmZzZXQgfHwgJ3NlbGYnLFxuICAgICAgcmFuZ2U6IG9wdGlvbnMucmFuZ2UsXG4gICAgfSxcbiAgfVxuXG4gIHN0YXRlLnRhcmdldEZpZWxkcyA9IHN0YXRlLnRhcmdldEZpZWxkcyB8fCBbXG4gICAgWyd3aWR0aCcsICdoZWlnaHQnXSxcbiAgICBbJ3gnLCAneSddLFxuICBdXG5cbiAgc25hcC5zdGFydChhcmcpXG4gIHN0YXRlLm9mZnNldHMgPSBhcmcuc3RhdGUub2Zmc2V0c1xuXG4gIGFyZy5zdGF0ZSA9IHN0YXRlXG59XG5cbmZ1bmN0aW9uIHNldCAoYXJnKSB7XG4gIGNvbnN0IHsgaW50ZXJhY3Rpb24sIHN0YXRlLCBjb29yZHMgfSA9IGFyZ1xuICBjb25zdCB7IG9wdGlvbnMsIG9mZnNldHMgfSA9IHN0YXRlXG4gIGNvbnN0IHJlbGF0aXZlID0ge1xuICAgIHg6IGNvb3Jkcy54IC0gb2Zmc2V0c1swXS54LFxuICAgIHk6IGNvb3Jkcy55IC0gb2Zmc2V0c1swXS55LFxuICB9XG5cbiAgc3RhdGUub3B0aW9ucyA9IGV4dGVuZCh7fSwgb3B0aW9ucylcbiAgc3RhdGUub3B0aW9ucy50YXJnZXRzID0gW11cblxuICBmb3IgKGNvbnN0IHNuYXBUYXJnZXQgb2YgKG9wdGlvbnMudGFyZ2V0cyB8fCBbXSkpIHtcbiAgICBsZXQgdGFyZ2V0XG5cbiAgICBpZiAoaXMuZnVuYyhzbmFwVGFyZ2V0KSkge1xuICAgICAgdGFyZ2V0ID0gc25hcFRhcmdldChyZWxhdGl2ZS54LCByZWxhdGl2ZS55LCBpbnRlcmFjdGlvbilcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0YXJnZXQgPSBzbmFwVGFyZ2V0XG4gICAgfVxuXG4gICAgaWYgKCF0YXJnZXQpIHsgY29udGludWUgfVxuXG4gICAgZm9yIChjb25zdCBbeEZpZWxkLCB5RmllbGRdIG9mIHN0YXRlLnRhcmdldEZpZWxkcykge1xuICAgICAgaWYgKHhGaWVsZCBpbiB0YXJnZXQgfHwgeUZpZWxkIGluIHRhcmdldCkge1xuICAgICAgICB0YXJnZXQueCA9IHRhcmdldFt4RmllbGRdXG4gICAgICAgIHRhcmdldC55ID0gdGFyZ2V0W3lGaWVsZF1cblxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRlLm9wdGlvbnMudGFyZ2V0cy5wdXNoKHRhcmdldClcbiAgfVxuXG4gIHNuYXAuc2V0KGFyZylcblxuICBzdGF0ZS5vcHRpb25zID0gb3B0aW9uc1xufVxuXG5jb25zdCBzbmFwU2l6ZSA9IHtcbiAgc3RhcnQsXG4gIHNldCxcbiAgZGVmYXVsdHM6IHtcbiAgICBlbmFibGVkOiBmYWxzZSxcbiAgICByYW5nZSAgOiBJbmZpbml0eSxcbiAgICB0YXJnZXRzOiBudWxsLFxuICAgIG9mZnNldDogbnVsbCxcbiAgfSxcbn1cblxuZXhwb3J0IGRlZmF1bHQgc25hcFNpemVcbiJdfQ==